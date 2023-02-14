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

  @ApiProperty({
    type: String,
    description: 'The ID of the University',
    example: '63ebfb1cb02e694c1cf93466',
  })
  @IsString()
  university: string;
}
