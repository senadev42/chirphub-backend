import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Birdhouse } from './birdhouse.entity';

@Entity('birdhouse_history')
export class BirdhouseHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  birds: number;

  @Column('int')
  eggs: number;

  @ManyToOne(() => Birdhouse, (birdhouse) => birdhouse.logs)
  birdhouse: Birdhouse;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
