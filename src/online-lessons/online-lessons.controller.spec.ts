import { Test, TestingModule } from '@nestjs/testing';
import { OnlineLessonsController } from './online-lessons.controller';
import { OnlineLessonsService } from './online-lessons.service';

describe('OnlineLessonsController', () => {
  let controller: OnlineLessonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnlineLessonsController],
      providers: [OnlineLessonsService],
    }).compile();

    controller = module.get<OnlineLessonsController>(OnlineLessonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
