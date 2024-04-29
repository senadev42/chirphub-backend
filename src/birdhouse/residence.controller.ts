import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  HttpCode,
  Get,
} from '@nestjs/common';
import { BirdhouseService } from './birdhouse.service';
import { XUbidGuard } from 'src/gaurds/xubid.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiXBUIDHeader } from './decorators/xubid-header.decorator';
import { UpdateResidenceDto } from './dto/residence-request.dto';
import { ResidenceService } from './residence.service';

@ApiTags('birdhouse')
@Controller('house')
export class ResidencyController {
  constructor(
    private readonly birdhouseService: BirdhouseService,
    private readonly residenceService: ResidenceService,
  ) {}

  @Post(':id/residency')
  @ApiOperation({
    summary: 'Residency data history for a birdhouse. Needs a valid X-UBID.',
  })
  @ApiXBUIDHeader()
  @UseGuards(XUbidGuard)
  @HttpCode(201)
  update(
    @Param('id') id: string,
    @Body() createResidenceRecordDto: UpdateResidenceDto,
  ) {
    return this.residenceService.createrecord(id, createResidenceRecordDto);
  }

  @Get(':id/residency')
  @ApiOperation({ summary: 'Fetch one birdhouse with residency data' })
  findOne(@Param('id') id: string) {
    return this.residenceService.birdhousewithlogs(id);
  }
}
