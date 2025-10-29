import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../../entities/patient.entity';
import { Appointment } from '../../entities/appointment.entity';
import { Revenue } from '../../entities/revenue.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Revenue)
    private revenueRepository: Repository<Revenue>,
  ) {}

  async seed() {
    console.log('Starting database seeding...');

    // Clear existing data (order matters due to foreign keys)
    const count = await this.patientRepository.count();
    if (count > 0) {
      console.log('Clearing existing data...');
      await this.revenueRepository.createQueryBuilder().delete().execute();
      await this.appointmentRepository.createQueryBuilder().delete().execute();
      await this.patientRepository.createQueryBuilder().delete().execute();
    }

    // Seed patients
    const patients = await this.seedPatients();
    console.log(`Created ${patients.length} patients`);

    // Seed appointments
    const appointments = await this.seedAppointments(patients);
    console.log(`Created ${appointments.length} appointments`);

    // Seed revenue
    const revenueRecords = await this.seedRevenue(appointments);
    console.log(`Created ${revenueRecords.length} revenue records`);

    console.log('Database seeding completed!');
  }

  private async seedPatients(): Promise<Patient[]> {
    const firstNames = [
      'John',
      'Jane',
      'Michael',
      'Sarah',
      'David',
      'Emily',
      'Robert',
      'Lisa',
      'William',
      'Mary',
      'James',
      'Jennifer',
      'Richard',
      'Linda',
      'Thomas',
    ];
    const lastNames = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Garcia',
      'Miller',
      'Davis',
      'Rodriguez',
      'Martinez',
    ];
    const genders = ['Male', 'Female'];
    const insuranceProviders = [
      'Blue Cross',
      'Aetna',
      'UnitedHealth',
      'Cigna',
      'Humana',
    ];

    const patients: Patient[] = [];

    for (let i = 0; i < 50; i++) {
      const firstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName =
        lastNames[Math.floor(Math.random() * lastNames.length)];
      const gender = genders[Math.floor(Math.random() * genders.length)];

      const patient = this.patientRepository.create({
        firstName,
        lastName,
        dateOfBirth: new Date(
          1950 + Math.floor(Math.random() * 60),
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1,
        ),
        gender,
        phoneNumber: `555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@email.com`,
        address: `${Math.floor(Math.random() * 9999) + 1} Main St, City, State`,
        insuranceProvider:
          insuranceProviders[
            Math.floor(Math.random() * insuranceProviders.length)
          ],
        insuranceNumber: `INS-${Math.floor(Math.random() * 1000000)}`,
        status: 'active',
      });

      patients.push(patient);
    }

    return this.patientRepository.save(patients);
  }

  private async seedAppointments(patients: Patient[]): Promise<Appointment[]> {
    const departments = [
      'Cardiology',
      'Neurology',
      'Orthopedics',
      'Pediatrics',
      'Emergency',
    ];
    const doctors = [
      'Dr. Smith',
      'Dr. Johnson',
      'Dr. Williams',
      'Dr. Brown',
      'Dr. Davis',
    ];
    const statuses = ['scheduled', 'completed', 'cancelled', 'no-show'];
    const appointmentTypes = ['consultation', 'follow-up', 'emergency'];

    const appointments: Appointment[] = [];
    const now = new Date();

    for (const patient of patients) {
      const numAppointments = Math.floor(Math.random() * 5) + 1;

      for (let i = 0; i < numAppointments; i++) {
        const daysAgo = Math.floor(Math.random() * 90);
        const appointmentDate = new Date(now);
        appointmentDate.setDate(appointmentDate.getDate() - daysAgo);

        const appointment = this.appointmentRepository.create({
          patientId: patient.id,
          department:
            departments[Math.floor(Math.random() * departments.length)],
          doctorName: doctors[Math.floor(Math.random() * doctors.length)],
          appointmentDate,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          appointmentType:
            appointmentTypes[
              Math.floor(Math.random() * appointmentTypes.length)
            ],
          notes: 'Patient consultation notes',
          consultationFee: 100 + Math.floor(Math.random() * 400),
          durationMinutes: 30 + Math.floor(Math.random() * 60),
        });

        appointments.push(appointment);
      }
    }

    return this.appointmentRepository.save(appointments);
  }

  private async seedRevenue(appointments: Appointment[]): Promise<Revenue[]> {
    const categories = [
      'consultation',
      'medication',
      'lab_test',
      'procedure',
      'imaging',
    ];
    const paymentMethods = ['cash', 'card', 'insurance', 'online'];

    const revenues: Revenue[] = [];

    for (const appointment of appointments) {
      if (appointment.status === 'completed' && appointment.consultationFee) {
        // Add consultation fee
        revenues.push(
          this.revenueRepository.create({
            date: new Date(appointment.appointmentDate),
            department: appointment.department,
            category: 'consultation',
            amount: appointment.consultationFee,
            paymentMethod:
              paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
            status: 'completed',
            patientId: appointment.patientId,
            appointmentId: appointment.id,
            description: `Consultation fee for ${appointment.appointmentType}`,
          }),
        );

        // Randomly add additional services
        if (Math.random() > 0.5) {
          revenues.push(
            this.revenueRepository.create({
              date: new Date(appointment.appointmentDate),
              department: appointment.department,
              category:
                categories[Math.floor(Math.random() * categories.length)],
              amount: 50 + Math.floor(Math.random() * 300),
              paymentMethod:
                paymentMethods[
                  Math.floor(Math.random() * paymentMethods.length)
                ],
              status: 'completed',
              patientId: appointment.patientId,
              appointmentId: appointment.id,
              description: 'Additional service fee',
            }),
          );
        }
      }
    }

    return this.revenueRepository.save(revenues);
  }
}
