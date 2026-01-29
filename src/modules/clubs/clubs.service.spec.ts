import { Test, TestingModule } from '@nestjs/testing';
import { Club } from './entities/club.entity';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Repository } from 'typeorm';

describe('ClubsService', () => {
  let service: ClubsService;
  let repository: Repository<Club>;

  // mocks

  const mockClub = {
    id: '6f736536-3756-4c3e-875e-510b9a4a20e0',
    name: 'KVN',
    createdAt: '2025-10-10T06:06:58.716Z',
    updatedAt: '2025-10-10T06:06:58.716Z',
  };

  const mockClubArray = [
    mockClub,
    {
      id: '6f736536-3756-4c3e-875e-510b9a4a20e1',
      name: 'Secret Club',
      createdAt: '2025-10-10T06:06:58.716Z',
      updatedAt: '2025-10-10T06:06:58.716Z',
    },
  ];

  // mockRepository

  const mockRepository = {
    save: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubsController],
      providers: [
        ClubsService,
        {
          provide: getRepositoryToken(Club),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClubsService>(ClubsService);
    repository = module.get<Repository<Club>>(getRepositoryToken(Club));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // create

  describe('create', () => {
    it('should create the club', async () => {
      const createClubDto: CreateClubDto = {
        name: 'Sample Club',
      };
      mockRepository.save.mockResolvedValue(mockClub);

      const res = await service.create(createClubDto);

      expect(res).toEqual(mockClub);
      expect(mockRepository.save).toHaveBeenCalledWith(createClubDto);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  // find all

  describe('findAll', () => {
    it('should return an club array', async () => {
      mockRepository.find.mockResolvedValue(mockClubArray);

      const res = await service.findAll();

      expect(res).toEqual(mockClubArray);
      expect(res).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalled();
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  // find one

  describe('findOne', () => {
    it('should return club by id', async () => {
      const clubId = '6f736536-3756-4c3e-875e-510b9a4a20e0';
      const mockClub = { id: clubId, name: 'Secret club' };

      mockRepository.findOne.mockResolvedValue(mockClub);
      const res = await service.findOne(clubId);

      expect(res).toEqual(mockClub);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: clubId },
      });
    });
  });

  // update

  describe('update', () => {
    it('should update club', async () => {
      const clubId = '6f736536-3756-4c3e-875e-510b9a4a20e0';
      const updateDto: UpdateClubDto = {
        name: 'Secret Club',
      };

      const updatedRes = {
        affected: 1,
        raw: [],
        generatedMaps: [],
      };

      const updatedClub = {
        id: clubId,
        name: 'Secret Club',
        createdAt: new Date('2025-10-23T10:15:00Z'),
        updatedAt: new Date('2025-10-23T10:15:00Z'),
      };

      mockRepository.update.mockResolvedValue(updatedRes);
      mockRepository.findOne.mockResolvedValue(updatedClub);

      const res = await service.update(clubId, updateDto);

      expect(res).toEqual(updatedClub);
      expect(mockRepository.update).toHaveBeenCalledWith(clubId, updateDto);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: clubId },
      });
    });
  });

  // delete

  describe('delete', () => {
    it('should delete club', async () => {
      const clubId = '6f736536-3756-4c3e-875e-510b9a4a20e0';

      const deleteResult = {
        affected: 1,
        raw: [],
      };

      mockRepository.delete.mockResolvedValue(deleteResult);

      const res = await service.delete(clubId);

      expect(res).toEqual(deleteResult);
      expect(mockRepository.delete).toHaveBeenCalledWith(clubId);
      expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
