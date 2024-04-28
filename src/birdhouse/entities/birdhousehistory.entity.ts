import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Birdhouse } from './birdhouse.entity';

@Entity("birdhouse_history")
export class BirdhouseHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  birds: number;
  
  @Column('int')
  eggs: number;

  @ManyToOne(() => Birdhouse, (birdhouse) => birdhouse.logs)
  birdhouse: Birdhouse;
}
