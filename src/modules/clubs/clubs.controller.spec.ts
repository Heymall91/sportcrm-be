import { Test, TestingModule } from '@nestjs/testing';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

describe('ClubsController', () => {
  let controller: ClubsController;
  let service: ClubsService;

  const mockClub = {
    id: '6f736536-3756-4c3e-875e-510b9a4a20e0',
    name: 'Secret Club',
    createdAt: '2025-10-10T06:06:58.716Z',
    updatedAt: '2025-10-10T06:06:58.716Z',
  };

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubsController],
      providers: [
        ClubsService,
        {
          provide: ClubsService,
          useValue: mockService,
        },
      ],
    }).compile();

    service = module.get<ClubsService>(ClubsService);
    controller = module.get<ClubsController>(ClubsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // create

  describe('create', () => {
    it('should create a new club', async () => {
      const createClubDto: CreateClubDto = {
        name: 'Secret Club',
      };

      mockService.create.mockResolvedValue(mockClub);

      const res = await controller.create(createClubDto);

      expect(res).toEqual(mockClub);
      expect(service.create).toHaveBeenCalledWith(createClubDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  // find all

  describe('findAll', () => {
    it('should return all clubs', async () => {
      const clubs = [
        mockClub,
        {
          ...mockClub,
          id: '6f736536-3756-4c3e-875e-510b9a4a26g9',
          name: 'Super Secret Club',
          createdAt: '2025-10-10T06:06:58.716Z',
          updatedAt: '2025-10-10T06:06:58.716Z',
        },
      ];

      mockService.findAll.mockResolvedValue(clubs);

      const res = await controller.findAll();

      expect(res).toEqual(clubs);
      expect(res).toHaveLength(2);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  // find one

  describe('findOne', () => {
    it('should return the club by id', async () => {
      const clubId = '6f736536-3756-4c3e-875e-510b9a4a20e0';

      mockService.findOne.mockResolvedValue(mockClub);

      const res = await controller.findOne(clubId);

      expect(res).toEqual(mockClub);
      expect(service.findOne).toHaveBeenCalledWith(clubId);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  // update

  describe('update', () => {
    it('should update club', async () => {
      const clubId = '6f736536-3756-4c3e-875e-510b9a4a20e0';
      const updateDto: UpdateClubDto = {
        name: 'Secret Club',
      };

      const res = { clubId, ...updateDto };
      mockService.update.mockResolvedValue(res);

      expect(await controller.update(clubId, updateDto)).toEqual(res);
      expect(mockService.update).toHaveBeenCalledWith(clubId, updateDto);
    });
  });

  // delete

  describe('delete', () => {
    it('should delete club by id', async () => {
      const clubId = '6f736536-3756-4c3e-875e-510b9a4a20e0';
      const res = { deleted: true };
      mockService.delete.mockResolvedValue(res);

      await controller.delete(clubId);
      expect(mockService.delete).toHaveBeenCalledWith(clubId);
    });
  });
});
