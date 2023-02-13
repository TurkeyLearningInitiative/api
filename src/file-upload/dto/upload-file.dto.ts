import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadFileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  key: string;

  @IsString()
  @IsNotEmpty()
  contentType: string;

  @IsNotEmpty()
  body: File | Buffer;
}
