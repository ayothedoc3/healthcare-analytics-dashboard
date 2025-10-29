import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { HealthModule } from './modules/health/health.module';
import { SeedModule } from './modules/seed/seed.module';
import { Patient } from './entities/patient.entity';
import { Appointment } from './entities/appointment.entity';
import { Revenue } from './entities/revenue.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER || 'meduser',
      password: process.env.DATABASE_PASSWORD || 'medpass123',
      database: process.env.DATABASE_NAME || 'med_analytics',
      entities: [Patient, Appointment, Revenue],
      synchronize: true, // Set to false in production
      logging: process.env.NODE_ENV === 'development',
    }),
    AnalyticsModule,
    HealthModule,
    SeedModule,
  ],
})
export class AppModule {}
