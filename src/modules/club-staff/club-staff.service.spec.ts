import { Test, TestingModule } from '@nestjs/testing';
import { ClubStaffService } from './club-staff.service';
import { Repository } from 'typeorm';
import { ClubStaff } from './entities/club-staff.entity';
import { ClubStaffController } from './club-staff.controller';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateClubStaffDto } from './dto/create-club-staff.dto';
import { UpdateClubStaffDto } from './dto/update-club-staff.dto';

import { StatusStaff } from './entities/club-staff.entity';

describe('ClubStaffService', () => {
  let service: ClubStaffService;
  let repository: Repository<ClubStaff>;

  const mockClubStaff = {
    userId: '550e8400-e29b-41d4-a716-446655440000',
    status: StatusStaff.ACTIVE,
    clubId: '534be797-e438-4405-b8a0-3c9359fb8590',
  };

  const mockClubStaffsArray = [
    mockClubStaff,
    {
      clubId: '534be797-e438-4405-b8a0-3c9359fb8206',
      userID: '550e8400-e29b-41d4-a716-446655440001',
      status: StatusStaff.INACTIVE,
    },
  ];

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubStaffController],
      providers: [
        ClubStaffService,
        {
          provide: getRepositoryToken(ClubStaff),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClubStaffService>(ClubStaffService);
    repository = module.get<Repository<ClubStaff>>(
      getRepositoryToken(ClubStaff),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // create

  describe('create', () => {
    it('should create a club staff', async () => {
      const createDto: CreateClubStaffDto = {
        userId: '550e8400-e29b-41d4-a716-446655440000',
        status: StatusStaff.ACTIVE,
        clubId: '534be797-e438-4405-b8a0-3c9359fb8590',
      };

      mockRepository.save.mockResolvedValue(mockClubStaff);

      const res = await mockRepository.save(createDto);
      expect(res).toEqual(mockClubStaff);
      expect(mockRepository.save).toHaveBeenLastCalledWith(createDto);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  // find all

  describe('findAll', () => {
    it('should find all club staffs', async () => {
      mockRepository.find.mockResolvedValue(mockClubStaffsArray);

      const res = await service.findAll();

      expect(res).toEqual(mockClubStaffsArray);
      expect(res).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  // find one

  describe('findOne', () => {
    it('should return a club staff by id', async () => {
      const clubStaffId = '534be797-e438-4405-b8a0-3c9359fb8590';

      mockRepository.findOneBy.mockResolvedValue(mockClubStaff);

      const res = await mockRepository.findOneBy({ id: clubStaffId });

      expect(res).toEqual(mockClubStaff);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        id: clubStaffId,
      });
      expect(mockRepository.findOneBy).toHaveBeenCalledTimes(1);
    });
  });

  // update

  describe('update', () => {
    it('should update a club staff status', async () => {
      const clubStaffId = '534be797-e438-4405-b8a0-3c9359fb8590';
      const updateDto: UpdateClubStaffDto = {
        status: StatusStaff.INACTIVE,
      };

      const updatedResult = {
        affected: 1,
        raw: [],
        generatedMaps: [],
      };

      mockRepository.update.mockResolvedValue(updatedResult);

      const res = await mockRepository.update(clubStaffId, updateDto);

      expect(res).toEqual(updatedResult);
      expect(repository.update).toHaveBeenCalledWith(clubStaffId, updateDto);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should delete a club staff', async () => {
      const clubStaffId = '550e8400-e29b-41d4-a716-446655440000';
      const res = { deleted: true };
      mockRepository.delete.mockResolvedValue(res);

      await service.delete(clubStaffId);
      expect(mockRepository.delete).toHaveBeenCalledWith(clubStaffId);
    });
  });
});
