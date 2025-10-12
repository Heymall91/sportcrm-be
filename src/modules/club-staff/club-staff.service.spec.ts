import { Test, TestingModule } from '@nestjs/testing';
import { ClubStaffService } from './club-staff.service';

describe('ClubStaffService', () => {
  let service: ClubStaffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClubStaffService],
    }).compile();

    service = module.get<ClubStaffService>(ClubStaffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
