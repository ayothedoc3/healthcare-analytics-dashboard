import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Patient } from '../../entities/patient.entity';
import { Appointment } from '../../entities/appointment.entity';
import { Revenue } from '../../entities/revenue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Appointment, Revenue])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
