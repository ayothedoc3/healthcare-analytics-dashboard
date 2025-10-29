import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Patient } from './patient.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  @Index()
  patientId: string;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  department: string;

  @Column({ type: 'varchar', length: 100 })
  doctorName: string;

  @Column({ type: 'timestamp' })
  @Index()
  appointmentDate: Date;

  @Column({ type: 'varchar', length: 50 })
  @Index()
  status: string; // scheduled, completed, cancelled, no-show

  @Column({ type: 'varchar', length: 100 })
  appointmentType: string; // consultation, follow-up, emergency

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  consultationFee: number;

  @Column({ type: 'integer', nullable: true })
  durationMinutes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
