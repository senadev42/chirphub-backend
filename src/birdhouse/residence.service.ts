import { Injectable, Logger } from '@nestjs/common';

import { Birdhouse } from './entities/birdhouse.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BirdhouseHistory } from './entities/birdhousehistory.entity';
import { UpdateResidenceDto } from './dto/residence-request.dto';

@Injectable()
export class ResidenceService {
  constructor(
    @InjectRepository(Birdhouse)
    private readonly birdhouseRepository: Repository<Birdhouse>,
    @InjectRepository(BirdhouseHistory)
    private readonly birdhouseHistoryRepository: Repository<BirdhouseHistory>,
  ) {}

  /**
   * Register a birdhouse
   * @param createBirdhouseDto
   * @returns Birdhouse entity/record
   */
  async createrecord(
    id: string,
    createResidenceRecordDto: UpdateResidenceDto,
    ubid: string,
  ) {
    const birdhouse = await this.birdhouseRepository.findOne({
      where: { id: id },
    });

    // Create a new BirdhouseHistory record
    const birdhouseHistory = this.birdhouseHistoryRepository.create({
      birds: createResidenceRecordDto.birds,
      eggs: createResidenceRecordDto.eggs,
      birdhouse: birdhouse,
    });

    await this.birdhouseHistoryRepository.save(birdhouseHistory);

    // Update the Birdhouse with the new birds and eggs values
    birdhouse.birds = createResidenceRecordDto.birds;
    birdhouse.eggs = createResidenceRecordDto.eggs;
    await this.birdhouseRepository.save(birdhouse);

    Logger.log(
      `Birdhouse ${birdhouse.id}'s residence has been updated by ${ubid}`,
      ResidenceService.name,
    );

    return {
      birds: birdhouseHistory.birds,
      eggs: birdhouseHistory.eggs,
      longitude: birdhouse.longitude,
      latitude: birdhouse.latitude,
      name: birdhouse.name,
    };
  }

  /**
   * Returns a birdhouse with a populated list of residency update logs
   * @returns a populated list of residency update logs
   */
  birdhousewithlogs(id: string) {
    const birdhousewithlogs = this.birdhouseRepository
      .createQueryBuilder('birdhouse')
      .leftJoinAndSelect('birdhouse.logs', 'logs')
      .where('birdhouse.id = :id', { id })
      .orderBy('logs.id', 'DESC') // Assuming 'createdAt' is the field you want to sort by
      .getOne();

    Logger.log(
      `Birdhouse ${id}'s residence logs has been fetched`,
      ResidenceService.name,
    );

    return birdhousewithlogs;
  }
}
