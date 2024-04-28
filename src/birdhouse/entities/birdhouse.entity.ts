import { Entity, Column, PrimaryGeneratedColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { BirdhouseHistory } from './birdhousehistory.entity';

@Entity("birdhouse")
export class Birdhouse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  ubid: string; 

  @Column({ length: 16 })
  name: string;

  @Column('double precision')
  longitude: number;

  @Column('double precision')
  latitude: number;

  @Column('int', { nullable: true })
  birds: number | null;
  
  @Column('int', { nullable: true })
  eggs: number | null;

  @OneToMany(() => BirdhouseHistory, (log) => log.birdhouse)
  logs: BirdhouseHistory[];
}
