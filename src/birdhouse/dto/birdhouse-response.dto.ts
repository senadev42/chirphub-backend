import { PartialType } from '@nestjs/mapped-types';
import { CreateBirdhouseDto } from './birdhouse-request.dto';

import { Exclude } from 'class-transformer';

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
  
export class AllBirdhouseResponseDto {
 id: string;
 name: string;
 longitude: number;
 latitude: number;
 birds: number;
 eggs: number;
}