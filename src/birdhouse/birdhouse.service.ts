import { Injectable } from '@nestjs/common';
import { CreateBirdhouseDto } from './dto/birdhouse-request.dto';
import { UpdateBirdhouseDto } from './dto/birdhouse-response.dto';
import { Birdhouse } from './entities/birdhouse.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BirdhouseService {
  constructor(
    @InjectRepository(Birdhouse)
    private birdhouseRepository: Repository<Birdhouse>,
  ) {}

  create(createBirdhouseDto: CreateBirdhouseDto, ubid: string) {
    const newBirdhouse = this.birdhouseRepository.create({
      ...createBirdhouseDto,
      ubid,
    });
    return this.birdhouseRepository.save(newBirdhouse);
  }

  findAll() {
    return `This action returns all birdhouse`;
  }

  findOne(id: string) {
    return this.birdhouseRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateBirdhouseDto: UpdateBirdhouseDto) {
    return `This action updates a #${id} birdhouse`;
  }

  remove(id: number) {
    return `This action removes a #${id} birdhouse`;
  }
}
