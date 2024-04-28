import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { BirdhouseService } from './birdhouse.service';
import { CreateBirdhouseDto } from './dto/birdhouse-request.dto';
import { CreateBirdhouseResponseDto, UpdateBirdhouseDto } from './dto/birdhouse-response.dto';

@Controller('house')
export class BirdhouseController {
  constructor(private readonly birdhouseService: BirdhouseService) {}

  @Post()
  async create(@Body() createBirdhouseDto: CreateBirdhouseDto, @Req() request) {
    const ubid = request.headers['x-ubid'];
    const newBirdhouse = await this.birdhouseService.create(createBirdhouseDto, ubid);
    return newBirdhouse;
 }

  @Get()
  findAll() {
    return this.birdhouseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.birdhouseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBirdhouseDto: UpdateBirdhouseDto) {
    return this.birdhouseService.update(+id, updateBirdhouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.birdhouseService.remove(+id);
  }
}
