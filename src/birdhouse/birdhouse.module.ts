import { Module } from '@nestjs/common';
import { BirdhouseService } from './birdhouse.service';
import { BirdhouseController } from './birdhouse.controller';
import { Birdhouse } from './entities/birdhouse.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResidencyController } from './residence.controller';
import { ResidenceService } from './residence.service';
import { BirdhouseHistory } from './entities/birdhousehistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Birdhouse, BirdhouseHistory])],
  controllers: [BirdhouseController, ResidencyController],
  providers: [BirdhouseService, ResidenceService],
})
export class BirdhouseModule {}
