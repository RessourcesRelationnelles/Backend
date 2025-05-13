import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, Role } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let service: AuthService;
  let userRepo: jest.Mocked<Partial<Repository<User>>>;
  let jwtService: jest.Mocked<JwtService>;

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
  };

  beforeEach(async () => {
    mockUser.password = await bcrypt.hash('testpass', 10);

    userRepo = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    jwtService = {
      sign: jest.fn(),
    } as any;

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
      (userRepo.findOne! as jest.Mock).mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

      const result = await service.validateUser('john@example.com', 'testpass');
      expect(userRepo.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
      expect(result).toEqual(expect.objectContaining({ email: mockUser.email }));
      expect(result).not.toHaveProperty('password');
    });

    it('should return null if user not found or password invalid', async () => {
      (userRepo.findOne! as jest.Mock).mockResolvedValue(null);


      const result = await service.validateUser('wrong@example.com', 'pass');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a signed access_token', async () => {
      const user = { id: 'uuid-1', email: 'john@example.com', role: Role.CITOYEN };
      jwtService.sign.mockReturnValue('fake-jwt-token');

      const result = await service.login(user);
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: user.email,
        sub: user.id,
        role: user.role,
      });
      expect(result).toEqual({ access_token: 'fake-jwt-token' });
    });
  });

  describe('generateToken', () => {
    it('should sign and return a token with user data', () => {
      jwtService.sign.mockReturnValue('token');
      const token = service.generateToken(mockUser);
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
      });
      expect(token).toEqual('token');
    });
  });

  describe('register', () => {
    it('should throw if password is missing', async () => {
      await expect(service.register({ email: 'test@example.com' })).rejects.toThrow(
        'Password is required',
      );
    });

    it('should throw if email already exists', async () => {
      (userRepo.findOne! as jest.Mock).mockResolvedValue(mockUser);

      await expect(
        service.register({ email: 'john@example.com', password: '1234' }),
      ).rejects.toThrow('Email already exists');
    });

    it('should create and return a token if registration succeeds', async () => {
      (userRepo.findOne! as jest.Mock).mockResolvedValue(null);
      (userRepo.create! as jest.Mock).mockReturnValue(mockUser);
      (userRepo.save! as jest.Mock).mockResolvedValue(mockUser);
      jwtService.sign.mockReturnValue('registered-token');

      const result = await service.register({ email: 'new@example.com', password: '1234' });

      expect(userRepo.create).toHaveBeenCalled();
      expect(userRepo.save).toHaveBeenCalled();
      expect(result).toEqual({ access_token: 'registered-token' });
    });
  });
});
