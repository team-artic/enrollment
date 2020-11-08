import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  typeIdentification: number;

  @Column('varchar', { length: 30 })
  identification: string;

  @Column('varchar', { length: 100 })
  firstName: string;

  @Column('varchar', { length: 100 })
  secondName: string;

  @Column('varchar', { length: 100 })
  firstSurname: string;

  @Column('varchar', { length: 100 })
  secondSurname: string;

  @Column({ type: 'timestamp' })
  birthDate: string;

  @Column('varchar', { length: 100 })
  placeBirth: string;

  @Column('varchar', { length: 10 })
  bloodGroup: string;

  @Column({ type: 'boolean' })
  sisben: boolean;

  @Column('varchar', { length: 200 })
  healthPromotingCompany: string;

  @Column('varchar', { length: 10 })
  stratum: string;

  @Column('varchar', { length: 200 })
  address: string;

  @Column('varchar', { length: 100 })
  neighborhood: string;

  @Column('varchar', { length: 200 })
  phone: string;

  @Column('varchar', { length: 200 })
  institutionProcedenica: string;

  @Column({ type: 'boolean' })
  displaced: boolean;
}
