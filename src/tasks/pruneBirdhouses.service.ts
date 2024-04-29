// src/services/pruneBirdhouses.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Birdhouse } from '../birdhouse/entities/birdhouse.entity';

@Injectable()
export class PruneBirdhousesService {
  constructor(
    @InjectRepository(Birdhouse)
    private birdhouseRepository: Repository<Birdhouse>,
  ) {}

  async pruneBirdhouses(): Promise<void> {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    await this.birdhouseRepository
      .createQueryBuilder()
      .delete()
      .where('updatedAt < :oneYearAgo', { oneYearAgo })
      .execute();
  }
}
