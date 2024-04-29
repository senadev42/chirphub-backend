import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PruneBirdhousesService } from './pruneBirdhouses.service';
import { PruneBirdhousesTask } from './pruneBirdhouses.task';
import { Birdhouse } from 'src/birdhouse/entities/birdhouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Birdhouse])],
  providers: [PruneBirdhousesTask, PruneBirdhousesService],
})
export class TaskModule {}
