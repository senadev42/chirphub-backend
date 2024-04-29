import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { BirdhouseService } from './birdhouse.service';
import { CreateBirdhouseDto, UpdateBirdhouseDto } from './dto/birdhouse-request.dto';
import { CreateBirdhouseResponseDto } from './dto/birdhouse-response.dto';
import { XUbidGuard } from 'src/gaurds/xubid.guard';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiXBUIDHeader } from './decorators/xubid-header.decorator';

@ApiTags('birdhouse')
@Controller('house')
export class BirdhouseController {
  constructor(private readonly birdhouseService: BirdhouseService) { }

  @Post()
  @UseGuards(XUbidGuard) //is looking out for the prescence of a X-UBID header
  @ApiOperation({ summary: 'Register a new birdhouse. Needs X-UBID.' })
  @ApiResponse({ status: 201 })
  @ApiBody({ type: CreateBirdhouseDto })
  @ApiXBUIDHeader()
  async create(@Body() createBirdhouseDto: CreateBirdhouseDto, @Req() request) {
    const ubid = request.headers['x-ubid'];
    const newBirdhouse = await this.birdhouseService.create(createBirdhouseDto, ubid);
    return newBirdhouse;
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all registered bird houses' })
  @ApiResponse({ status: 200 })
  findAll() {
    return this.birdhouseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch one birdhouse' })
  findOne(@Param('id') id: string) {
    return this.birdhouseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a birdhouse. Needs X-UBID.' })
  @ApiXBUIDHeader()
  @UseGuards(XUbidGuard)
  update(@Param('id') id: string, @Body() updateBirdhouseDto: UpdateBirdhouseDto, @Req() request) {
    const ubid = request.headers['x-ubid'];
    return this.birdhouseService.update(id, updateBirdhouseDto, ubid);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deregister a birdhouse. Needs X-UBID.' })
  @ApiXBUIDHeader()
  @UseGuards(XUbidGuard)
  remove(@Param('id') id: string, @Req() request) {
    const ubid = request.headers['x-ubid'];
    return this.birdhouseService.remove(id, ubid);
  }
}
