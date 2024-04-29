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

  create(createBirdhouseDto: CreateBirdhouseDto) {

    const ubid = uuid();
    const newBirdhouse = this.birdhouseRepository.create({...createBirdhouseDto, ubid});

    const createdbirdhouse = this.birdhouseRepository.save(newBirdhouse);

    Logger.log(
      `Birdhouse ${newBirdhouse.name} created by ${ubid}`,
      'BirdhouseService',
    );

    return createdbirdhouse;
  }

  findAll() {
    return this.birdhouseRepository.find();
  }

  findOne(id: string) {
    return this.birdhouseRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateData: Partial<Birdhouse>, ubid: string) {
    const birdhouse = await this.birdhouseRepository.findOne({
      where: { id: id },
    });
    if (!birdhouse) {
      throw new NotFoundException(`Birdhouse with ID ${id} not found`);
    }

    if (birdhouse.ubid !== ubid) {
      throw new HttpException(
        'Ubid does not match the birdhouse',
        HttpStatus.UNAUTHORIZED,
      );
    }

    Object.assign(birdhouse, updateData);
    return this.birdhouseRepository.save(birdhouse);
  }

  remove(id: string, ubid: string) {
    return `This action removes a ${id} birdhouse`;
  }
}

