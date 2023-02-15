import { Test, TestingModule } from '@nestjs/testing';
import { OnlineLessonsService } from './online-lessons.service';

describe('OnlineLessonsService', () => {
  let service: OnlineLessonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnlineLessonsService],
    }).compile();

    service = module.get<OnlineLessonsService>(OnlineLessonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
