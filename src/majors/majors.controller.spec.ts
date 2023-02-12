import { Test, TestingModule } from '@nestjs/testing';
import { MajorsController } from './majors.controller';
import { MajorsService } from './majors.service';

describe('MajorsController', () => {
  let controller: MajorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MajorsController],
      providers: [MajorsService],
    }).compile();

    controller = module.get<MajorsController>(MajorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
