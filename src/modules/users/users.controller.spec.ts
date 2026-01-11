import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { GenderType } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { Auth0Guard } from '../auth/guard/authGuard';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

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
  };

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
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
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockService,
        },
         {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUser,
        },
      ],
    })
    .overrideGuard(Auth0Guard)
    .useValue({ canActivate: () => true })
    .compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.AUTH0_AUDIENCE;
    delete process.env.AUTH0_DOMAIN;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //  create

 describe('create', () => {
  it('should create a new user', async () => {
    const mockCurrentUser = createMockUser();
    
    const createUserDto: CreateUserDto = {
      firstName: 'Vasyl',
      lastName: 'Pyrig',
      phone: '+1234567890',
      gender: GenderType.MALE,
      birthday: new Date('2000-01-28'),
      height: 180,
      weight: 75,
    };

    const mockCreatedUser = createMockUser({
      ...createUserDto,
      id: 'new-user-uuid',
    });

    mockService.create.mockResolvedValue(mockCreatedUser);

    const result = await controller.create(
      createUserDto,
      mockCurrentUser
    );

    expect(result).toEqual(mockCreatedUser);
    expect(mockService.create).toHaveBeenCalledWith(
      createUserDto,
      mockCurrentUser.id
    );
    expect(mockService.create).toHaveBeenCalledTimes(1);
  });
  });

  // findAll

  describe('findAll', () => {
    it('should give all users into array', async () => {
      const users = [
        mockUser,
        {
          ...mockUser,
          id: '660e8400-e29b-41d4-a716-446655440001',
          firstName: 'Alla',
          phone: '+48987654321',
          gender: GenderType.FEMALE,
        },
      ];

      mockService.findAll.mockResolvedValue(users);

      const res = await service.findAll();

      expect(res).toEqual(users);
      expect(res).toHaveLength(2);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  // findOne

  describe('findOne', () => {
  it('should return a users UUID', async () => {
    const mockCurrentUser = createMockUser();
    
    const mockUser: User = {
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
    } as User;

    mockService.findOne.mockResolvedValue(mockUser);

    const result = await controller.findOne(
      mockUser.id,
      mockCurrentUser
    );

    expect(result).toBeDefined();
    expect(mockService.findOne).toHaveBeenCalledWith(
      mockUser.id,
      mockCurrentUser.id
    );
    expect(mockService.findOne).toHaveBeenCalledTimes(1);
  });
});

  // update

  describe('update', () => {
  it('should update a user account', async () => {
    const mockCurrentUser: User = {
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
    };

    const userId = '123e4567-e89b-12d3-a456-426614174000';
    
    const updateUserDto: UpdateUserDto = {
      firstName: 'UpdatedName',
      height: 185,
    };

    const updatedUser: User = {
      ...mockCurrentUser,
      ...updateUserDto,
      updatedById: mockCurrentUser.id,
    };

    mockService.update.mockResolvedValue(updatedUser);

    const result = await controller.update(
      userId,
      updateUserDto,
      mockCurrentUser
    );

    expect(result).toEqual(updatedUser);
    expect(mockService.update).toHaveBeenCalledWith(
      userId,
      updateUserDto,
      mockCurrentUser.id
    );
    expect(mockService.update).toHaveBeenCalledTimes(1);
    });
  });

  // delete

  describe('delete', () => {
    it('should delete a user', async () => {
      const mockCurrentUser = {
    id: 'current-user-uuid',
    firstName: 'John',
    lastName: 'Doe',
  } as User;

  const userId = 'user-to-delete-uuid';

  await controller.delete(userId, mockCurrentUser);

  expect(mockService.delete).toHaveBeenCalledWith(userId, mockCurrentUser.id);
  expect(mockService.delete).toHaveBeenCalledTimes(1);
    });
  });
});
