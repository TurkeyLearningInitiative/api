import { Test, TestingModule } from '@nestjs/testing';
import { UniversityMajorsService } from './university-majors.service';

describe('MajorsService', () => {
  let service: UniversityMajorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversityMajorsService],
    }).compile();

    service = module.get<UniversityMajorsService>(UniversityMajorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
