import { Test, TestingModule } from '@nestjs/testing';
import { UniversityMajorsController } from './university-majors.controller';
import { UniversityMajorsService } from './university-majors.service';

describe('MajorsController', () => {
  let controller: UniversityMajorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniversityMajorsController],
      providers: [UniversityMajorsService],
    }).compile();

    controller = module.get<UniversityMajorsController>(
      UniversityMajorsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
