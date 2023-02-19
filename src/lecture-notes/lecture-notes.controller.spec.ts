import { Test, TestingModule } from '@nestjs/testing';
import { LectureNotesController } from './lecture-notes.controller';
import { LectureNotesService } from './lecture-notes.service';

describe('LectureNotesController', () => {
  let controller: LectureNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectureNotesController],
      providers: [LectureNotesService],
    }).compile();

    controller = module.get<LectureNotesController>(LectureNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  const x = 5;
});
