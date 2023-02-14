import { Test, TestingModule } from '@nestjs/testing';
import { UniversitiesService } from './universities.service';

describe('UniversitiesService', () => {
  let service: UniversitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversitiesService],
    }).compile();

    service = module.get<UniversitiesService>(UniversitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
