// src/birdhouse/dto/create-birdhouse.dto.ts
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateBirdhouseDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 16)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;
}

