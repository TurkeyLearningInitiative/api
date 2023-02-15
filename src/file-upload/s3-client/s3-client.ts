import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { UploadFileDto } from '../dto/upload-file.dto';

@Injectable()
export class S3Client {
  async upload(uploadFileDto: UploadFileDto) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Body: uploadFileDto.body,
        Key: `${uuid()}-${uploadFileDto.name}`,
        ContentType: uploadFileDto.contentType,
      })
      .promise();

    return uploadResult.Location;
  }
}
