import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, Role } from '../user/user.entity';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let service: AuthService;
  let userRepo: any;
  let jwtService: any;

  const mockUser: User = {
    id: 'uuid-1',
    pseudo: 'tester',
    bio: 'test bio',
    photoDeProfil: '',
    name: 'Doe',
    firstName: 'John',
    email: 'john@example.com',
    password: '',
    role: Role.CITOYEN,
    dateCreation: new Date(),
    is_active: true,
    followers: [],
    following: []
  };

  beforeEach(async () => {
    mockUser.password = await bcryptjs.hash('testpass', 10);
    userRepo = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    jwtService = { sign: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: userRepo },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('should return user data without password if password is valid', async () => {
      userRepo.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcryptjs, 'compare').mockImplementation(async () => true);
      const result = await service.validateUser('john@example.com', 'testpass');
      expect(userRepo.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
      expect(result).toEqual(expect.objectContaining({ email: mockUser.email }));
      expect(result).not.toHaveProperty('password');
    });
    it('should return null if user not found', async () => {
      userRepo.findOne.mockResolvedValue(null);
      const result = await service.validateUser('notfound@example.com', 'testpass');
      expect(result).toBeNull();
    });
    it('should return null if password is invalid', async () => {
      userRepo.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcryptjs, 'compare').mockImplementation(async () => false);
      const result = await service.validateUser('john@example.com', 'wrongpass');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access_token', async () => {
      jwtService.sign.mockReturnValue('token');
      const user = { ...mockUser };
      const result = await service.login(user);
      expect(result).toEqual({ access_token: 'token' });
    });
  });

  describe('register', () => {
    it('should register a new user and return access_token', async () => {
      userRepo.findOne.mockResolvedValue(null);
      userRepo.create.mockReturnValue(mockUser);
      userRepo.save.mockResolvedValue(mockUser);
      jwtService.sign.mockReturnValue('token');
      const data = { ...mockUser, password: 'testpass' };
      const result = await service.register(data);
      expect(result).toEqual({ access_token: 'token' });
    });
    it('should throw if email already exists', async () => {
      userRepo.findOne.mockResolvedValue(mockUser);
      await expect(service.register({ ...mockUser, password: 'testpass' })).rejects.toThrow('Email already exists');
    });
    it('should throw if password is missing', async () => {
      await expect(service.register({ ...mockUser, password: undefined })).rejects.toThrow('Password is required');
    });
  });
});
