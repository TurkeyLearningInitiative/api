import { Test, TestingModule } from '@nestjs/testing';
import { LectureNotesService } from './lecture-notes.service';

describe('LectureNotesService', () => {
  let service: LectureNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectureNotesService],
    }).compile();

    service = module.get<LectureNotesService>(LectureNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
