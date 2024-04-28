// src/birdhouse/dto/create-birdhouse.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

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

export class UpdateBirdhouseDto {
 @IsOptional()
 @IsNumber()
 longitude?: number;

 @IsOptional()
 @IsNumber()
 latitude?: number;

 @IsOptional()
 @IsString()
 name?: string;
}


