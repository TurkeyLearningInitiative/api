import { PartialType } from '@nestjs/swagger';
import { CreateUniversityMajorDto } from './create-university-major.dto';

export class UpdateUniversityMajorDto extends PartialType(
  CreateUniversityMajorDto,
) {}
