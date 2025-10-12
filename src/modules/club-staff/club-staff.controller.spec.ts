import { Test, TestingModule } from '@nestjs/testing';
import { ClubStaffController } from './club-staff.controller';
import { ClubStaffService } from './club-staff.service';

describe('ClubStaffController', () => {
  let controller: ClubStaffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubStaffController],
      providers: [ClubStaffService],
    }).compile();

    controller = module.get<ClubStaffController>(ClubStaffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
