import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { BirdhouseService } from './birdhouse.service';
import { CreateBirdhouseDto, UpdateBirdhouseDto } from './dto/birdhouse-request.dto';
import { CreateBirdhouseResponseDto } from './dto/birdhouse-response.dto';
import { XUbidGuard } from 'src/gaurds/xubid.guard';

@Controller('house')
export class BirdhouseController {
  constructor(private readonly birdhouseService: BirdhouseService) {}

  @Post()
  @UseGuards(XUbidGuard)
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
  @UseGuards(XUbidGuard)
  update(@Param('id') id: string, @Body() updateBirdhouseDto: UpdateBirdhouseDto, @Req() request) {
    const ubid = request.headers['x-ubid'];
    return this.birdhouseService.update(id, updateBirdhouseDto, ubid);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.birdhouseService.remove(+id);
  }
}
