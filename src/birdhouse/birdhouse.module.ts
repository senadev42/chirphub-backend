import { Module } from '@nestjs/common';
import { BirdhouseService } from './birdhouse.service';
import { BirdhouseController } from './birdhouse.controller';
import { Birdhouse } from './entities/birdhouse.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Birdhouse])],
  controllers: [BirdhouseController],
  providers: [BirdhouseService],
})
export class BirdhouseModule {}
