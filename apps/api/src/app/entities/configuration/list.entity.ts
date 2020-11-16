import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'Configuration', name: 'List' })
export class List extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'ParentId', type: 'int4', nullable: true})
  parentId: number;

  @ManyToOne(() => List, list => list.parentId)
  @JoinColumn({ name: 'ParentId' })
  parent: List;

  @Column({ name: 'Description', type: 'varchar', length: 200})
  description: string;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'ModifiedAt' })
  modifiedAt: Date;

}
