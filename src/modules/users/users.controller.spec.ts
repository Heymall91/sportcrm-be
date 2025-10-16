import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { GenderType } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    firstName: 'Vasyl',
    lastName: 'Pyrig',
    phone: '+48123456789',
    birthday: new Date('2000-01-28'),
    gender: GenderType.MALE,
    height: 180,
    weight: 75,
    clubStaff: [],
    createdAt: new Date('2025-01-01T10:00:00Z'),
    updatedAt: new Date('2025-01-01T10:00:00Z'),
    deletedAt: null,
  }

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

 beforeEach( async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [UsersController],
    providers: [{
      provide: UsersService,
      useValue: mockService
    }]
  }).compile();

  service = module.get<UsersService>(UsersService);
  controller = module.get<UsersController>(UsersController);
 })

 afterEach(() => {
    jest.clearAllMocks()
  });

  it('should be defined', () => {
    expect(controller).toBeDefined()
  });

//  create

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto =  {
        firstName: 'Vasyl',
        lastName: 'Pyrig',
        phone: '+48987654321',
        birthday: new Date('2000-01-28').toISOString(),
        gender: GenderType.MALE
      };

      mockService.create.mockResolvedValue(mockUser);

      const res = await controller.create(createUserDto);
      expect(res).toEqual(mockUser);
      expect(mockService.create).toHaveBeenCalledWith(createUserDto);
      expect(mockService.create).toHaveBeenCalledTimes(1);
    })
  })

  // findAll

  describe('findAll', () => {
    it('should give all users into array', async () => {
      const users = [
        mockUser,
        {
          ...mockUser,
          id: '660e8400-e29b-41d4-a716-446655440001',
          firstName: 'Anna',
          phone: '+48987654321',
          gender: GenderType.FEMALE,
        },
      ];

      mockService.findAll.mockResolvedValue(users);

      const res = await controller.findAll();

      expect(res).toEqual(users);
      expect(res).toHaveLength(2);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  })

  // findOne

  describe('findOne', () => {
    it('should return a user with UUID', async () => {
      const userId = '550e8400-e29b-41d4-a716-446655440000';
      mockService.findOne.mockResolvedValue(mockUser);

      const res = await controller.findOne(userId);

      expect(res).toEqual(mockUser);
      expect(mockService.findOne).toHaveBeenCalledWith(userId);
      expect(mockService.findOne).toHaveBeenCalledTimes(1);
    })
  })

  // // update

  describe('update', () => {
    it('should update user first name', async () => {
      const updateUserDto: UpdateUserDto = {
        firstName: 'Nikanor',
      };

      const updatedUser = { ...mockUser, firstName: 'Nikanor' };
      mockService.update.mockResolvedValue(undefined);
      mockService.findOne.mockResolvedValue(updatedUser);

      const result = await controller.update(mockUser.id, updateUserDto);

      expect(result.firstName).toBe('Nikanor');
      expect(service.update).toHaveBeenCalledWith(mockUser.id, updateUserDto);
    });

  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const deletedUser = {
        ...mockUser,
        deletedAt: new Date('2025-10-16T12:00:00Z'),
      };
      mockService.delete.mockResolvedValue(deletedUser);

      const result = await controller.remove(mockUser.id);

      expect(result.deletedAt).toBeDefined();
      expect(result.deletedAt).toBeInstanceOf(Date);
      expect(service.delete).toHaveBeenCalledWith(mockUser.id);
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  })
});
