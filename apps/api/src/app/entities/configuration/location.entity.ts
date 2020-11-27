import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';
import { List } from './list.entity';

@Entity({ schema: 'Configuration', name: 'Location' })
@Tree('closure-table')
export class Location {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ParentId', type: 'int4', nullable: true })
  parentId: number;

  @TreeChildren()
  children: Location[];

  @TreeParent()
  parent: Location;

  // @ManyToOne(() => Location, (location) => location.parentId, {eager: true, nullable: true})
  // @JoinColumn({ name: 'ParentId' })
  // parent: Location;

  // @OneToMany(() => Location, (location) => location.parent, {eager: false, nullable: true})
  // location: Location[];

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
