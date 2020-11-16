import { List } from './list.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'Configuration', name: 'Location' })
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ParentId', type: 'int4', nullable: true })
  parentId: number;

  @ManyToOne(() => Location, (location) => location.parentId)
  @JoinColumn({ name: 'Parentid' })
  location: Location;

  @OneToMany(() => Location, (location) => location.location)
  locations: Location[];

  @Column({ name: 'TypeLocationId', type: 'int4', nullable: false })
  typeLocationId: number;

  @ManyToOne(() => List, (list) => list.id)
  @JoinColumn({ name: 'TypeLocationId' })
  typeLocation: List;

  @Column({ name: 'Code', type: 'varchar', nullable: true, length: 50 })
  code: string;

  @Column({ name: 'Name', type: 'varchar', nullable: false, length: 200 })
  name: string;

  @Column({ name: 'Active', type: 'boolean', nullable: false })
  active: boolean;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'ModifiedAt' })
  modifiedAt: Date;
}
