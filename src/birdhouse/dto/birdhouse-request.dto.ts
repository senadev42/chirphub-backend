// src/birdhouse/dto/create-birdhouse.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateBirdhouseDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 16)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  latitude: number;
}

export class UpdateBirdhouseDto {
 @IsOptional()
 @IsNumber()
 @ApiProperty()
 longitude?: number;

 @IsOptional()
 @IsNumber()
 @ApiProperty()
 latitude?: number;

 @IsOptional()
 @IsString()
 @ApiProperty()
 name?: string;
}


