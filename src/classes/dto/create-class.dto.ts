import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({
    type: String,
    description: 'The name of the class',
    example: 'Databases',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'The ID of the Major',
    example: '63e8db500cf2728f997eaeb3',
  })
  @IsString()
  majorId: string;
}