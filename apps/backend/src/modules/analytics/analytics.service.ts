import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Patient } from '../../entities/patient.entity';
import { Appointment } from '../../entities/appointment.entity';
import { Revenue } from '../../entities/revenue.entity';
import { AnalyticsQueryDto } from '../../dto/analytics-query.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Revenue)
    private revenueRepository: Repository<Revenue>,
  ) {}

  async getOverview(query: AnalyticsQueryDto) {
    const dateFilter = this.buildDateFilter(query);

    const [
      totalPatients,
      newPatients,
      totalAppointments,
      completedAppointments,
      totalRevenue,
    ] = await Promise.all([
      this.patientRepository.count(),
      this.patientRepository.count({
        where: dateFilter.createdAt ? { createdAt: dateFilter.createdAt } : {},
      }),
      this.appointmentRepository.count({
        where: dateFilter.appointmentDate
          ? { appointmentDate: dateFilter.appointmentDate }
          : {},
      }),
      this.appointmentRepository.count({
        where: {
          status: 'completed',
          ...(dateFilter.appointmentDate
            ? { appointmentDate: dateFilter.appointmentDate }
            : {}),
        },
      }),
      this.calculateTotalRevenue(dateFilter.date),
    ]);

    const averageRevenuePerPatient =
      newPatients > 0 ? totalRevenue / newPatients : 0;

    return {
      totalPatients,
      newPatients,
      totalAppointments,
      completedAppointments,
      cancelledAppointments: totalAppointments - completedAppointments,
      totalRevenue,
      averageRevenuePerPatient: Math.round(averageRevenuePerPatient * 100) / 100,
      period: {
        startDate: query.startDate || 'all-time',
        endDate: query.endDate || 'now',
      },
    };
  }

  async getRevenueByPeriod(query: AnalyticsQueryDto) {
    const dateFilter = this.buildDateFilter(query);

    const queryBuilder = this.revenueRepository
      .createQueryBuilder('revenue')
      .select('DATE(revenue.date)', 'date')
      .addSelect('SUM(revenue.amount)', 'total')
      .addSelect('revenue.department', 'department')
      .groupBy('DATE(revenue.date)')
      .addGroupBy('revenue.department')
      .orderBy('DATE(revenue.date)', 'ASC');

    if (dateFilter.date) {
      queryBuilder.where('revenue.date BETWEEN :start AND :end', {
        start: dateFilter.date.moreThanOrEqual,
        end: dateFilter.date.lessThanOrEqual,
      });
    }

    if (query.department) {
      queryBuilder.andWhere('revenue.department = :department', {
        department: query.department,
      });
    }

    const results = await queryBuilder.getRawMany();

    return results.map((row) => ({
      date: row.date,
      department: row.department,
      total: parseFloat(row.total),
    }));
  }

  async getPatientStatistics(query: AnalyticsQueryDto) {
    const dateFilter = this.buildDateFilter(query);

    const ageGroups = await this.patientRepository
      .createQueryBuilder('patient')
      .select(
        `CASE
          WHEN EXTRACT(YEAR FROM AGE(patient.dateOfBirth)) < 18 THEN 'Under 18'
          WHEN EXTRACT(YEAR FROM AGE(patient.dateOfBirth)) BETWEEN 18 AND 35 THEN '18-35'
          WHEN EXTRACT(YEAR FROM AGE(patient.dateOfBirth)) BETWEEN 36 AND 50 THEN '36-50'
          WHEN EXTRACT(YEAR FROM AGE(patient.dateOfBirth)) BETWEEN 51 AND 65 THEN '51-65'
          ELSE 'Over 65'
        END`,
        'ageGroup',
      )
      .addSelect('COUNT(*)', 'count')
      .groupBy(`CASE
          WHEN EXTRACT(YEAR FROM AGE(patient.dateOfBirth)) < 18 THEN 'Under 18'
          WHEN EXTRACT(YEAR FROM AGE(patient.dateOfBirth)) BETWEEN 18 AND 35 THEN '18-35'
          WHEN EXTRACT(YEAR FROM AGE(patient.dateOfBirth)) BETWEEN 36 AND 50 THEN '36-50'
          WHEN EXTRACT(YEAR FROM AGE(patient.dateOfBirth)) BETWEEN 51 AND 65 THEN '51-65'
          ELSE 'Over 65'
        END`)
      .getRawMany();

    const genderDistribution = await this.patientRepository
      .createQueryBuilder('patient')
      .select('patient.gender', 'gender')
      .addSelect('COUNT(*)', 'count')
      .groupBy('patient.gender')
      .getRawMany();

    return {
      ageGroups: ageGroups.map((row) => ({
        ageGroup: row.ageGroup,
        count: parseInt(row.count),
      })),
      genderDistribution: genderDistribution.map((row) => ({
        gender: row.gender,
        count: parseInt(row.count),
      })),
    };
  }

  async getAppointmentTrends(query: AnalyticsQueryDto) {
    const dateFilter = this.buildDateFilter(query);

    const queryBuilder = this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('DATE(appointment.appointmentDate)', 'date')
      .addSelect('appointment.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('DATE(appointment.appointmentDate)')
      .addGroupBy('appointment.status')
      .orderBy('DATE(appointment.appointmentDate)', 'ASC');

    if (dateFilter.appointmentDate) {
      queryBuilder.where(
        'appointment.appointmentDate BETWEEN :start AND :end',
        {
          start: dateFilter.appointmentDate.moreThanOrEqual,
          end: dateFilter.appointmentDate.lessThanOrEqual,
        },
      );
    }

    if (query.department) {
      queryBuilder.andWhere('appointment.department = :department', {
        department: query.department,
      });
    }

    const results = await queryBuilder.getRawMany();

    return results.map((row) => ({
      date: row.date,
      status: row.status,
      count: parseInt(row.count),
    }));
  }

  async getDepartmentPerformance(query: AnalyticsQueryDto) {
    const dateFilter = this.buildDateFilter(query);

    const queryBuilder = this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('appointment.department', 'department')
      .addSelect('COUNT(*)', 'totalAppointments')
      .addSelect(
        `COUNT(CASE WHEN appointment.status = 'completed' THEN 1 END)`,
        'completedAppointments',
      )
      .addSelect(
        `COUNT(CASE WHEN appointment.status = 'cancelled' THEN 1 END)`,
        'cancelledAppointments',
      )
      .groupBy('appointment.department');

    if (dateFilter.appointmentDate) {
      queryBuilder.where(
        'appointment.appointmentDate BETWEEN :start AND :end',
        {
          start: dateFilter.appointmentDate.moreThanOrEqual,
          end: dateFilter.appointmentDate.lessThanOrEqual,
        },
      );
    }

    const appointmentStats = await queryBuilder.getRawMany();

    // Get revenue by department
    const revenueQueryBuilder = this.revenueRepository
      .createQueryBuilder('revenue')
      .select('revenue.department', 'department')
      .addSelect('SUM(revenue.amount)', 'totalRevenue')
      .groupBy('revenue.department');

    if (dateFilter.date) {
      revenueQueryBuilder.where('revenue.date BETWEEN :start AND :end', {
        start: dateFilter.date.moreThanOrEqual,
        end: dateFilter.date.lessThanOrEqual,
      });
    }

    const revenueStats = await revenueQueryBuilder.getRawMany();

    // Merge appointment and revenue data
    const departments = new Map();

    appointmentStats.forEach((stat) => {
      departments.set(stat.department, {
        department: stat.department,
        totalAppointments: parseInt(stat.totalAppointments),
        completedAppointments: parseInt(stat.completedAppointments),
        cancelledAppointments: parseInt(stat.cancelledAppointments),
        totalRevenue: 0,
      });
    });

    revenueStats.forEach((stat) => {
      const dept = departments.get(stat.department) || {
        department: stat.department,
        totalAppointments: 0,
        completedAppointments: 0,
        cancelledAppointments: 0,
        totalRevenue: 0,
      };
      dept.totalRevenue = parseFloat(stat.totalRevenue);
      departments.set(stat.department, dept);
    });

    return Array.from(departments.values());
  }

  private buildDateFilter(query: AnalyticsQueryDto) {
    const filter: any = {};

    if (query.startDate && query.endDate) {
      filter.date = Between(new Date(query.startDate), new Date(query.endDate));
      filter.createdAt = Between(
        new Date(query.startDate),
        new Date(query.endDate),
      );
      filter.appointmentDate = Between(
        new Date(query.startDate),
        new Date(query.endDate),
      );
    }

    return filter;
  }

  private async calculateTotalRevenue(dateFilter?: any): Promise<number> {
    const queryBuilder = this.revenueRepository
      .createQueryBuilder('revenue')
      .select('SUM(revenue.amount)', 'total')
      .where('revenue.status = :status', { status: 'completed' });

    if (dateFilter) {
      queryBuilder.andWhere('revenue.date BETWEEN :start AND :end', {
        start: dateFilter.moreThanOrEqual,
        end: dateFilter.lessThanOrEqual,
      });
    }

    const result = await queryBuilder.getRawOne();
    return parseFloat(result?.total || '0');
  }
}
