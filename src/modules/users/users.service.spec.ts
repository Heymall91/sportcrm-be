import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GenderType } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>

  // mocks

  const mockUser = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    firstName: 'Vasyl',
    lastName: 'Pyrig',
    phone: '+1234567890',
    birthday: new Date('1990-01-01'),
    gender: GenderType.MALE,
    height: 180,
    weight: 75,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

   const mockUserArray = [
    mockUser,
    {
      id: '123e4567-e89b-12d3-a456-426614174001',
      firstName: 'Anna',
      lastName: 'Vasyliova',
      phone: '+0987654321',
      birthday: new Date('1992-05-15'),
      gender: GenderType.FEMALE,
      height: 165,
      weight: 60,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];

  // rep mock

  const mockRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findOneBy: jest.fn()
  }

  beforeEach( async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository
        }
      ],
      controllers: [UsersController]
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  })

  afterEach(() => {
    jest.clearAllMocks()
  });

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // create

  describe('create', () => {
    it('should create a new user', async () => {
      const createDto: CreateUserDto = {
        firstName: 'Vasyl',
        lastName: 'Pyrig',
        phone: '+1234567890',
        birthday: new Date('2000-01-28').toISOString(),
        gender: GenderType.MALE,
        height: 180,
        weight: 75,
      };

      mockRepository.save.mockResolvedValue(mockUser);
      const res = await service.create(createDto);

      expect(res).toEqual(mockUser);
      expect(repository.save).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  // find all

  describe('findAll', () => {
    it('should find all users', async () => {
      mockRepository.find.mockResolvedValue(mockUserArray);

      const res = await service.findAll();

      expect(res).toEqual(mockUserArray);
      expect(res).toHaveLength(2);
      expect(repository.find).toHaveBeenCalled();
      expect(repository.find).toHaveBeenCalledTimes(1);
    });

  })

  // find one

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const userId = '123e4567-e89b-12d3-a456-426614174000';

      mockRepository.findOneBy.mockResolvedValue(mockUser);

      const res = await service.findOne(userId);

      expect(res).toEqual(mockUser);
      expect(repository.findOneBy).toHaveBeenCalledWith({id: userId});
      expect(repository.findOneBy).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = '123e4567-e89b-12d3-a456-426614174000';
      const updateDto: UpdateUserDto = {
        firstName: 'Vasyl Updated',
        lastName: 'Pyrig Updated'
      }

      const updatedResult = {
        affected: 1,
        raw: [],
        generatedMaps: []
      };

      mockRepository.update.mockResolvedValue(updatedResult);

      const res = await service.update(userId, updateDto);

      expect(res).toEqual(updatedResult);
      expect(repository.update).toHaveBeenCalledWith(userId, updateDto);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const userId = '123e4567-e89b-12d3-a456-426614174000';

      const deleteResult = {
        affected: 1,
        raw: []
      };

      mockRepository.delete.mockResolvedValue(deleteResult);

      const res = await service.delete(userId);

      expect(res).toEqual(deleteResult);
      expect(repository.delete).toHaveBeenCalledWith(userId);
      expect(repository.delete).toHaveBeenCalledTimes(1);
    });
  })

});
