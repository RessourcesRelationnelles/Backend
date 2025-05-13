import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return login result if user is valid', async () => {
      const dto = { email: 'test@mail.com', password: 'pass' };
      const user = { id: 1, email: dto.email };
      const loginResult = { access_token: 'token' };

      mockAuthService.validateUser.mockResolvedValue(user);
      mockAuthService.login.mockReturnValue(loginResult);

      const result = await controller.login(dto);
      expect(result).toEqual(loginResult);
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(dto.email, dto.password);
      expect(mockAuthService.login).toHaveBeenCalledWith(user);
    });

    it('should throw UnauthorizedException if user is invalid', async () => {
      const dto = { email: 'wrong@mail.com', password: 'wrong' };
      mockAuthService.validateUser.mockResolvedValue(null);

      await expect(controller.login(dto)).rejects.toThrow(UnauthorizedException);
      expect(mockAuthService.validateUser).toHaveBeenCalledWith(dto.email, dto.password);
    });
  });

  describe('register', () => {
    it('should call authService.register and return result', async () => {
      const dto = { email: 'new@mail.com', password: 'pass', name: 'Test' };
      const registerResult = { id: 2, email: dto.email };

      mockAuthService.register.mockResolvedValue(registerResult);

      const result = await controller.register(dto);
      expect(result).toEqual(registerResult);
      expect(mockAuthService.register).toHaveBeenCalledWith(dto);
    });
  });
});