import { PartialType } from '@nestjs/mapped-types';
import { CreateBirdhouseDto } from './birdhouse-request.dto';

export class UpdateBirdhouseDto extends PartialType(CreateBirdhouseDto) {}

export class CreateBirdhouseResponseDto {
    id: string;
    ubid: string;
    birds: number;
    eggs: number;
    longitude: number;
    latitude: number;
    name: string;
  }
  