import { Test, TestingModule } from '@nestjs/testing';
import { ClubStaffController } from './club-staff.controller';
import { ClubStaffService } from './club-staff.service';
import { CreateClubStaffDto } from './dto/create-club-staff.dto';
import { UpdateClubStaffDto } from './dto/update-club-staff.dto';
import { StatusStaff } from './entities/club-staff.entity';

describe('ClubStaffController', () => {
  let controller: ClubStaffController;
  let service: ClubStaffService;

  const mockClubStaff = {
    userId: '550e8400-e29b-41d4-a716-446655440000',
    status: StatusStaff.ACTIVE,
    clubId: '534be797-e438-4405-b8a0-3c9359fb8590',
  };

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubStaffController],
      providers: [
        ClubStaffService,
        {
          provide: ClubStaffService,
          useValue: mockService,
        },
      ],
    }).compile();

    service = module.get<ClubStaffService>(ClubStaffService);
    controller = module.get<ClubStaffController>(ClubStaffController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // create

  describe('create', () => {
    it('should create a new clubstaff member', async () => {
      const createDto: CreateClubStaffDto = {
        clubId: '534be797-e438-4405-b8a0-3c9359fb8590',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        status: StatusStaff.ACTIVE,
      };

      mockService.create.mockResolvedValue(mockClubStaff);

      const res = await controller.create(createDto);
      expect(res).toEqual(mockClubStaff);
      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  // findAll

  describe('findAll', () => {
    it('should return all club staff members', async () => {
      const clubStaffs = [
        mockClubStaff,
        {
          ...mockClubStaff,
          clubId: '534be797-e438-4405-b8a0-3c9359fb8590',
          userID: '550e8400-e29b-41d4-a716-446655440000',
          status: StatusStaff.ACTIVE,
        },
      ];

      mockService.findAll.mockResolvedValue(clubStaffs);

      const res = await controller.findAll();
      expect(res).toEqual(clubStaffs);
      expect(res).toHaveLength(2);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  // findOne

  describe('findOne', () => {
    it('should return the club staff by id', async () => {
      const clubStaffId = '534be797-e438-4405-b8a0-3c9359fb8590';
      mockService.findOne.mockResolvedValue(mockClubStaff);

      const res = await controller.findOne(clubStaffId);

      expect(res).toEqual(mockClubStaff);
      expect(mockService.findOne).toHaveBeenCalledWith(clubStaffId);
      expect(mockService.findOne).toHaveBeenCalledTimes(1);
    });
  });

  // update

  describe('update', () => {
    it('should update the club staff', async () => {
      const updateDto: UpdateClubStaffDto = {
        status: StatusStaff.INACTIVE,
      };

      const updatedStaff = { ...mockClubStaff, updateDto };
      mockService.update.mockResolvedValue(updatedStaff);

      const res = await controller.update(
        '550e8400-e29b-41d4-a716-446655440000',
        updateDto,
      );

      expect(res).toEqual(updatedStaff);
      expect(service.update).toHaveBeenCalledWith(
        '550e8400-e29b-41d4-a716-446655440000',
        updateDto,
      );
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  // remove

  describe('delete', () => {
    it('should delete a club staff by id', async () => {
      const clubStaffId = '550e8400-e29b-41d4-a716-446655440000';
      const res = { deleted: true };
      mockService.delete.mockResolvedValue(res);

      await service.delete(clubStaffId);
      expect(mockService.delete).toHaveBeenCalledWith(clubStaffId);
    });
  });
});
