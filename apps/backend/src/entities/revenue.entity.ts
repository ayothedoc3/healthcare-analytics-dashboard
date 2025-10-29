import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('revenue')
export class Revenue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  @Index()
  date: Date;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  department: string;

  @Column({ type: 'varchar', length: 100 })
  category: string; // consultation, medication, lab_test, procedure, etc.

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 50 })
  paymentMethod: string; // cash, card, insurance, online

  @Column({ type: 'varchar', length: 50, default: 'completed' })
  @Index()
  status: string; // completed, pending, refunded

  @Column({ type: 'uuid', nullable: true })
  patientId: string;

  @Column({ type: 'uuid', nullable: true })
  appointmentId: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
