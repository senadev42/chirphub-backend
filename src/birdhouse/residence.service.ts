import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateBirdhouseDto } from './dto/birdhouse-request.dto';
import { UpdateBirdhouseDto } from './dto/birdhouse-response.dto';
import { Birdhouse } from './entities/birdhouse.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
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
  async createrecord(id: string, createResidenceRecordDto: UpdateResidenceDto) {

    const birdhouse = await this.birdhouseRepository.findOne({ where: { id: id } });

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

    return {
        birds: birdhouseHistory.birds,
        eggs: birdhouseHistory.eggs,
        longitude: birdhouse.longitude,
        latitude: birdhouse.latitude,
        name: birdhouse.name
    };
 }

  /**
   * Returns a birdhouse with a populated list of residency update logs
   * @returns a populated list of residency update logs
   */
  birdhousewithlogs(id: string) {
    return this.birdhouseRepository.findOne({ 
        where: { id: id },
        relations: ['logs'] // Specify the relation to load
     });
  }
}
