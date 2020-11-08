import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  studentId: number;

  @Column({ type: 'int' })
  fatherId: number;

  @Column({ type: 'int' })
  motherId: number;

  @Column({ type: 'int' })
  managerId: number;

  @Column({ type: 'int' })
  year: number;

  @Column('varchar', { length: 30 })
  enrollmentNumber: string;

  @Column('varchar', { length: 100 })
  sheetNumber: string;

  @Column('varchar', { length: 100 })
  grade: string;
}
