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

  @Column({ name: 'TypeIdentification', type: 'int4' })
  typeIdentification: number;

  @ManyToOne(() => List, (list) => list.id)
  @JoinColumn({ name: 'PadreId' })
  typesIdentifications: List;

  @Column({ name: 'Identification', type: 'varchar', length: 30 })
  identification: string;

  @Column({ name: 'FirstName', type: 'varchar', nullable: false, length: 100 })
  firstName: string;

  @Column({ name: 'SecondName', type: 'varchar', length: 100 })
  secondName: string;

  @Column({ name: 'FirstSurname', nullable: false, length: 100 })
  firstSurname: string;

  @Column({ name: 'SecondSurname', type: 'varchar', length: 100 })
  secondSurname: string;

  @Column({ name: 'BirthDate', type: 'timestamp' })
  birthDate: string;

  @Column({ name: 'PlaceBirthId', type: 'int4' })
  placeBirthId: number;

  @ManyToOne(() => Location, (location) => location.id)
  @JoinColumn({ name: 'PlaceBirthId' })
  placeBirth: Location;

  @Column({ name: 'BloodGroupId', type: 'int4' })
  bloodGroupId: number;

  @ManyToOne(() => List, (list) => list.id)
  @JoinColumn({ name: 'BloodGroupId' })
  bloodGroup: List;

  @Column({ name: 'Sisben', type: 'boolean' })
  sisben: boolean;

  @Column({ name: 'HealthPromotingCompany', length: 200 })
  healthPromotingCompany: string;

  @Column({ name: 'Stratum', type: 'varchar', length: 10 })
  stratum: string;

  @Column({ name: 'Address', type: 'varchar', length: 200 })
  address: string;

  @Column({ name: 'NeighborhoodId', type: 'int4' })
  neighborhoodId: number;

  @ManyToOne(() => Location, (location) => location.id)
  @JoinColumn({ name: 'NeighborhoodId' })
  neighborhood: Location;

  @Column({ name: 'Phone', type: 'varchar', length: 15 })
  phone: string;

  @Column({ name: 'InstitutionProcedenica', type: 'varchar', length: 200 })
  institutionProcedenica: string;

  @Column({ name: 'Occupation', type: 'varchar', length: 50 })
  occupation: string;

  @Column({ name: 'Displaced', type: 'boolean' })
  displaced: boolean;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'ModifiedAt' })
  modifiedAt: Date;
}
