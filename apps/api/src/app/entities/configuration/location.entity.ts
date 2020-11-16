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

  @Column({ name: 'TypeLocationId', type: 'int4', nullable: false })
  typeLocationId: number;

  @ManyToOne(() => List, (list) => list.id)
  @JoinColumn({ name: 'TypeLocationId' })
  typeLocation: List;

  @Column({ name: 'PadreId', type: 'int4', nullable: false })
  padreId: number;

  @ManyToOne(() => Location, (location) => location.padreId)
  @JoinColumn({ name: 'PadreId' })
  location: Location;

  @OneToMany(() => Location, (location) => location.location)
  locations: Location[];

  @Column({ name: 'Name', type: 'varchar', nullable: false, length: 200 })
  name: string;

  @Column({ name: 'Active', type: 'int4', nullable: false })
  active: boolean;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'ModifiedAt' })
  modifiedAt: Date;
}
