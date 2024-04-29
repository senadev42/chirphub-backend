import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { BirdhouseService } from './birdhouse.service';
import { CreateBirdhouseDto, UpdateBirdhouseDto } from './dto/birdhouse-request.dto';
import { AllBirdhouseResponseDto, CreateBirdhouseResponseDto } from './dto/birdhouse-response.dto';
import { XUbidGuard } from 'src/gaurds/xubid.guard';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiXBUIDHeader } from './decorators/xubid-header.decorator';

@ApiTags('birdhouse')
@Controller('house')
export class BirdhouseController {
  constructor(private readonly birdhouseService: BirdhouseService) { }

  @Post()
  @ApiOperation({ summary: 'Register a new birdhouse.' })
  @ApiResponse({ status: 201 })
  @ApiBody({ type: CreateBirdhouseDto })
  async create(@Body() createBirdhouseDto: CreateBirdhouseDto) {
    const newBirdhouse = await this.birdhouseService.create(createBirdhouseDto);
    return newBirdhouse;
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all registered bird houses' })
  @ApiResponse({ status: 200 })
  findAll(): Promise<AllBirdhouseResponseDto[]> {
    return this.birdhouseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch one birdhouse' })
  findOne(@Param('id') id: string) {
    return this.birdhouseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a birdhouse by id. Needs a valid, registered X-UBID.' })
  @ApiXBUIDHeader()
  @UseGuards(XUbidGuard)
  update(@Param('id') id: string, @Body() updateBirdhouseDto: UpdateBirdhouseDto, @Req() request) {
    const ubid = request.headers['x-ubid'];
    return this.birdhouseService.update(id, updateBirdhouseDto, ubid);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deregister a birdhouse. Needs X-UBID.' })
  @ApiParam({ name: 'id', description: 'Birdhouse uuid in Database' })
  @ApiXBUIDHeader()
  @UseGuards(XUbidGuard)
  remove(@Param('id') id: string, @Req() request) {
    const ubid = request.headers['x-ubid'];
    return this.birdhouseService.remove(id, ubid);
  }
}
