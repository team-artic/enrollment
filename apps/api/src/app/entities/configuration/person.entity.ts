import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { List } from './list.entity';
import { Location } from './location.entity';

@Entity({ schema: 'Configuration', name: 'Person' })
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'TypeIdentificationId', nullable: true, type: 'int4' })
  typeIdentificationId: number;

  @ManyToOne(() => List, (list) => list.id)
  @JoinColumn({ name: 'TypeIdentificationId' })
  typesIdentifications: List;

  @Column({
    name: 'Identification',
    nullable: true,
    type: 'varchar',
    length: 30,
  })
  identification: string;

  @Column({ name: 'FirstName', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'SecondName', nullable: true, type: 'varchar', length: 100 })
  secondName: string;

  @Column({ name: 'FirstSurname', nullable: false, length: 100 })
  firstSurname: string;

  @Column({
    name: 'SecondSurname',
    nullable: true,
    type: 'varchar',
    length: 100,
  })
  secondSurname: string;

  @Column({ name: 'BirthDate', nullable: true, type: 'timestamp' })
  birthDate: string;

  @Column({ name: 'GenderId', nullable: true, type: 'int4' })
  genderId: number;

  @ManyToOne(() => List, (list) => list.id)
  @JoinColumn({ name: 'GenderId' })
  gender: List;

  @Column({ name: 'PlaceBirthId', nullable: true, type: 'int4' })
  placeBirthId: number;

  @ManyToOne(() => Location, (location) => location.id)
  @JoinColumn({ name: 'PlaceBirthId' })
  placeBirth: Location;

  @Column({ name: 'BloodGroupId', nullable: true, type: 'int4' })
  bloodGroupId: number;

  @ManyToOne(() => List, (list) => list.id)
  @JoinColumn({ name: 'BloodGroupId' })
  bloodGroup: List;

  @Column({ name: 'Sisben', nullable: true, type: 'boolean' })
  sisben: boolean;

  @Column({ name: 'HealthPromotingCompany', nullable: true, length: 200 })
  healthPromotingCompany: string;

  @Column({ name: 'Stratum', nullable: true, type: 'varchar', length: 10 })
  stratum: string;

  @Column({ name: 'Address', nullable: true, type: 'varchar', length: 200 })
  address: string;

  @Column({ name: 'NeighborhoodId', nullable: true, type: 'int4' })
  neighborhoodId: number;

  @ManyToOne(() => Location, (location) => location.id)
  @JoinColumn({ name: 'NeighborhoodId' })
  neighborhood: Location;

  @Column({ name: 'Phone', nullable: true, type: 'varchar', length: 15 })
  phone: string;

  @Column({
    name: 'InstitutionProcedenica',
    nullable: true,
    type: 'varchar',
    length: 200,
  })
  institutionProcedenica: string;

  @Column({ name: 'Occupation', nullable: true, type: 'varchar', length: 50 })
  occupation: string;

  @Column({ name: 'Displaced', nullable: true, type: 'boolean' })
  displaced: boolean;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'ModifiedAt' })
  modifiedAt: Date;
}
