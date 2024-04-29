// src/birdhouse/dto/create-birdhouse.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';


export class UpdateResidenceDto {
 @IsNumber()
 @IsNotEmpty()
 @ApiProperty()
 birds: number;

 @IsNumber()
 @IsNotEmpty()
 @ApiProperty()
 eggs: number;
}