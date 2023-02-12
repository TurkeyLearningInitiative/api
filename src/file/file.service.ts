import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateFileDto } from './dto/update-file.dto';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { File, FileDocument } from './entities/file.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name)
    private publicFilesRepository: Model<FileDocument>,
  ) {}

  async uploadPublicFile(
    dataBuffer: Buffer | File,
    createFileDto: CreateFileDto,
    contentType: string,
  ) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuid()}-${createFileDto.name}`,
        ContentType: contentType,
      })
      .promise();

    const newFile = await this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
      name: createFileDto.name,
    });

    return newFile;
  }

  async findAll() {
    const files = await this.publicFilesRepository.find();
    return { data: files };
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  async remove(id: string) {
    const fileToDelete = await this.publicFilesRepository.findById(id);
    if (!fileToDelete) {
      throw new NotFoundException();
    } else {
      const s3 = new S3();

      const deletedFile = await fileToDelete.delete();

      return { data: deletedFile };
    }
  }
  /*   async removeAll() {
    return await this.publicFilesRepository.deleteMany({});
  } */
}
