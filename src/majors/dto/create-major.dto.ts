import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMajorDto {
  @ApiProperty({
    type: String,
    description: 'The name of the Major',
    example: 'Bilgisayar Mühendisliği',
  })
  @IsString()
  name: string;
}
