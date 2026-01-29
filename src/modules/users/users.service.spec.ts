import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Auth0Guard } from '../auth/guard/authGuard';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const createMockUser = (overrides?: Partial<User>): User => ({
    id: '123e4567-e89b-12d3-a456-426614174000',
    auth0ID: 'auth0|123456789',
    email: 'v.pyrig@mail.com',
    firstName: 'Vasyl',
    lastName: 'Pyrig',
    phone: '+1234567890',
    gender: GenderType.MALE,
    birthday: '1990-01-01' as any,
    height: 180,
    weight: 75,
    isRegistrationCompleted: true,
    createdById: '4d1cb0f5-3da4-4cb6-889f-77f17b1b0865',
    createdBy: {
      id: '4d1cb0f5-3da4-4cb6-889f-77f17b1b0865',
      firstName: 'Creator',
      } as User,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    clubStaff: [],
    createdUsers: [],
});

  // mocks

  const mockUser = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    firstName: 'Vasyl',
    lastName: 'Pyrig',
    phone: '+1234567890',
    birthday: new Date('1990-01-01'),
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
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    merge: jest.fn(),
  };

  const mockAuthService = {
    validateUser: jest.fn().mockResolvedValue({
      id: 'test-user-id',
      email: 'test@example.com',
    }),
  };

  beforeAll(() => {
    process.env.AUTH0_AUDIENCE = 'https://test-api';
    process.env.AUTH0_DOMAIN = 'test.auth0.com';
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
      controllers: [UsersController],
    })
    .overrideGuard(Auth0Guard)
    .useValue({ canActivate: () => true })
    .compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.AUTH0_AUDIENCE;
    delete process.env.AUTH0_DOMAIN;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // create

  describe('create', () => {
  it('should create a new user', async () => {
  const createDto: CreateUserDto = {
    firstName: 'Vasyl',
    lastName: 'Pyrig',
    phone: '+1234567890',
    gender: GenderType.MALE,
    birthday: new Date('2000-01-28'),
    height: 180,
    weight: 75,
  };

  const creatorId = 'creator-user-id';

  const mockUser = createMockUser({
    ...createDto,
    id: 'new-user-id',
  });

  mockRepository.create.mockReturnValue({
    ...createDto,
    createdById: creatorId,
  });
  
  mockRepository.save.mockResolvedValue(mockUser);

  const res = await service.create(createDto, creatorId);

  expect(res).toEqual(mockUser);
  
  expect(mockRepository.create).toHaveBeenCalledWith({
    ...createDto,
    createdById: creatorId,
  });
  
  expect(mockRepository.save).toHaveBeenCalledWith(
    expect.objectContaining({
      firstName: createDto.firstName,
      lastName: createDto.lastName,
      phone: createDto.phone,
    })
  );
});
});

  // find all

  describe('findAll', () => {
    it('should find all users', async () => {
      mockRepository.find.mockResolvedValue(mockUserArray);

      const res = await service.findAll();

      expect(res).toEqual(mockUserArray);
      expect(res).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalled();
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  // find one

  describe('findOne', () => {
    it('should update a user', async () => {
  const userId = '123e4567-e89b-12d3-a456-426614174000';
  const updateDto = {
    firstName: 'Vasyl Updated',
    lastName: 'Pyrig Updated',
  };
  
  const fixedDate = new Date('2025-10-25T08:56:05.430Z');
  
  const existingUser = {
    id: userId,
    firstName: 'Vasyl',
    lastName: 'Pyrig',
    phone: '+1234567890',
    gender: 'male',
    birthday: new Date('1990-01-01'),
    height: 180,
    weight: 75,
    createdAt: fixedDate,
    updatedAt: fixedDate,
    deletedAt: null,
  };
  
  const updatedUser = {
    ...existingUser,
    ...updateDto, 
  };
  
  mockRepository.findOne.mockResolvedValue(existingUser);
  mockRepository.merge.mockReturnValue(updatedUser);
  mockRepository.save.mockResolvedValue(updatedUser);
  
  const res = await service.update(userId, updateDto);
  
  expect(res).toEqual(updatedUser);
});
  });

  // delete

  describe('delete', () => {
    it('should delete a user', async () => {
  const userId = '123e4567-e89b-12d3-a456-426614174000';
  const requestingUserId = 'creator-user-id';
  
  const mockUser = {
    id: userId,
    createdById: requestingUserId,
  } as User;
  
  mockRepository.findOne.mockResolvedValue(mockUser);
  mockRepository.delete.mockResolvedValue({ affected: 1, raw: {} });

  await service.delete(userId, requestingUserId);

  console.log('Calls:', mockRepository.delete.mock.calls);
  
  expect(mockRepository.delete).toHaveBeenCalledWith(userId);
});
  });
});
