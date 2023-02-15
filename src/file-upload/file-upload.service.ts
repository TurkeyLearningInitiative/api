import { Injectable } from '@nestjs/common';
import { S3Client } from './s3-client/s3-client';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class FileUploadService {
  constructor(private s3Client: S3Client) {}

  upload(uploadFileDto: UploadFileDto) {
    return this.s3Client.upload(uploadFileDto);
  }
}
