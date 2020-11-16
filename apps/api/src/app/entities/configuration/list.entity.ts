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

@Entity({ schema: 'Configuration', name: 'List' })
export class List extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ParentId', type: 'int4', nullable: true })
  parentId: number;

  @ManyToOne(() => List, (list) => list.parentId)
  @JoinColumn({ name: 'ParentId' })
  parent: List;

  @Column({ name: 'Code', nullable: true, type: 'varchar', length: 100 })
  code: string;

  @Column({ name: 'Name', type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'Editable', type: 'boolean' })
  editable: string;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'ModifiedAt' })
  modifiedAt: Date;
}
