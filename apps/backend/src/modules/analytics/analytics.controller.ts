import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { AnalyticsQueryDto } from '../../dto/analytics-query.dto';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  @ApiOperation({
    summary: 'Get dashboard overview metrics',
    description:
      'Returns key performance indicators including patient counts, appointments, and revenue',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved overview metrics',
  })
  async getOverview(@Query(ValidationPipe) query: AnalyticsQueryDto) {
    return this.analyticsService.getOverview(query);
  }

  @Get('revenue')
  @ApiOperation({
    summary: 'Get revenue data by period',
    description: 'Returns revenue broken down by date and department',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved revenue data',
  })
  async getRevenueByPeriod(@Query(ValidationPipe) query: AnalyticsQueryDto) {
    return this.analyticsService.getRevenueByPeriod(query);
  }

  @Get('patients')
  @ApiOperation({
    summary: 'Get patient statistics',
    description: 'Returns patient demographics including age groups and gender distribution',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved patient statistics',
  })
  async getPatientStatistics(@Query(ValidationPipe) query: AnalyticsQueryDto) {
    return this.analyticsService.getPatientStatistics(query);
  }

  @Get('appointments')
  @ApiOperation({
    summary: 'Get appointment trends',
    description: 'Returns appointment data over time with status breakdown',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved appointment trends',
  })
  async getAppointmentTrends(@Query(ValidationPipe) query: AnalyticsQueryDto) {
    return this.analyticsService.getAppointmentTrends(query);
  }

  @Get('departments')
  @ApiOperation({
    summary: 'Get department performance metrics',
    description: 'Returns performance metrics for each department including appointments and revenue',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved department performance data',
  })
  async getDepartmentPerformance(
    @Query(ValidationPipe) query: AnalyticsQueryDto,
  ) {
    return this.analyticsService.getDepartmentPerformance(query);
  }
}
