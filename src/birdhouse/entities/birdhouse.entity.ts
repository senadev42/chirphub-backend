import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BirdhouseHistory } from './birdhousehistory.entity';

@Entity('birdhouse')
export class Birdhouse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true, select: false })
  ubid: string;

  @Column({ length: 16 })
  name: string;

  @Column('double precision')
  longitude: number;

  @Column('double precision')
  latitude: number;

  @Column({ type: 'int', default: 0 })
  birds: number;

  @Column({ type: 'int', default: 0 })
  eggs: number;

  @OneToMany(() => BirdhouseHistory, (log) => log.birdhouse)
  logs: BirdhouseHistory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
