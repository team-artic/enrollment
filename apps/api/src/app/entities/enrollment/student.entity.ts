import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { List } from './../configuration/list.entity';
import { Person } from './../configuration/person.entity';

@Entity({ schema: 'Enrollment', name: 'Student' })
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'StudentId', type: 'int4', nullable: false })
  studentId: number;

  @ManyToOne(() => Person, person => person.id)
  @JoinColumn({ name: 'StudentId' })
  student: Person;

  @Column({ name: 'FatherId', type: 'int4' })
  fatherId: number;

  @ManyToOne(() => Person, person => person.id)
  @JoinColumn({ name: 'FatherId' })
  father: Person;

  @Column({ name: 'MotherId', type: 'int4' })
  motherId: number;

  @ManyToOne(() => Person, person => person.id)
  @JoinColumn({ name: 'MotherId' })
  mother: Person;

  @Column({ name: 'LegalGuardian', type: 'int4', nullable: false })
  legalGuardianId: number;

  @ManyToOne(() => Person, person => person.id)
  @JoinColumn({ name: 'legalGuardianId' })
  legalGuardian: Person;

  @Column({ type: 'int', nullable: true, })
  year: number;

  @Column({ name: 'GradeId', type: 'int4', nullable: false })
  gradeId: number;

  @ManyToOne(() => List, list => list.id)
  @JoinColumn({ name: 'GradeId' })
  grade: List;

  @Column({type: 'varchar', nullable: false, length: 30})
  enrollmentNumber: string;

  @Column({type: 'varchar', length: 100})
  sheetNumber: string;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'ModifiedAt' })
  modifiedAt: Date;

}
