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

@Injectable()
export class BirdhouseService {
  constructor(
    @InjectRepository(Birdhouse)
    private birdhouseRepository: Repository<Birdhouse>,
  ) {}

  /**
   * Register a birdhouse
   * @param createBirdhouseDto
   * @returns Birdhouse entity/record
   */
  create(createBirdhouseDto: CreateBirdhouseDto) {
    const ubid = uuid();
    const newBirdhouse = this.birdhouseRepository.create({
      ...createBirdhouseDto,
      ubid,
    });

    const createdbirdhouse = this.birdhouseRepository.save(newBirdhouse);

    Logger.log(
      `Birdhouse ${newBirdhouse.name} created by ${ubid}`,
      BirdhouseService.name,
    );

    return createdbirdhouse;
  }

  /**
   * Returns list of all birdhouses
   * @returns List of all bird houses
   */
  findAll() {
    const birdhouseList = this.birdhouseRepository.find();

    Logger.log(
      `Fetched and return list of all bird houses`,
      BirdhouseService.name,
    );
    return birdhouseList;
  }

  /**
   * Returns a birdhouse record
   * @param id birdhouse db identifier
   * @returns Birdhouse record
   */
  findOne(id: string) {
    return this.birdhouseRepository.findOne({ where: { id: id } });
  }

  /**
   * Updates a birdhouse record
   * @param id birdhouse db identifier
   * @param updateData birdhouse record
   * @param ubid birdhouse BIRD header
   * @returns Updated birdhouse record */
  async update(
    id: string,
    updateData: Partial<CreateBirdhouseDto>,
    ubid: string,
  ) {
    const birdhouse = await this.birdhouseRepository.findOne({
      where: { id: id },
    });

    Object.assign(birdhouse, updateData);

    const updatedBirdhouse = this.birdhouseRepository.save(birdhouse);

    Logger.log(
      `Birdhouse ${birdhouse.id} updated by ${ubid}.`,
      BirdhouseService.name,
    );

    return updatedBirdhouse;
  }

  /**
   * Deregisters a birdhouse
   * @param id birdhouse db identifier
   * @param ubid birdhouse BIRD header
   * @returns
   */
  async remove(id: string, ubid: string) {
    const birdhouse = await this.birdhouseRepository.findOne({
      where: { id: id },
    });
    if (!birdhouse) {
      throw new NotFoundException(`Birdhouse with ID ${id} not found`);
    }

    Logger.log(
      `Birdhouse ${birdhouse.id} removed by ${ubid}.`,
      BirdhouseService.name,
    );

    await this.birdhouseRepository.remove(birdhouse);
    return { message: `Birdhouse with ID ${id} removed successfully` };
  }
}
