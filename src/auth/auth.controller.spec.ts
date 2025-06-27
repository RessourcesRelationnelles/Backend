import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: Partial<Record<keyof AuthService, jest.Mock>>;

  beforeEach(async () => {
    service = {
      validateUser: jest.fn(),
      login: jest.fn(),
      register: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: service },
      ],
    }).compile();
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return login result if user is valid', async () => {
      const dto = { email: 'test@mail.com', password: 'pass' };
      const user = { id: 1, email: dto.email };
      const loginResult = { access_token: 'token' };
      (service.validateUser as jest.Mock).mockResolvedValue(user);
      (service.login as jest.Mock).mockReturnValue(loginResult);
      const result = await controller.login(dto);
      expect(result).toEqual(loginResult);
      expect(service.validateUser).toHaveBeenCalledWith(dto.email, dto.password);
      expect(service.login).toHaveBeenCalledWith(user);
    });
    it('should throw UnauthorizedException if user is invalid', async () => {
      const dto = { email: 'wrong@mail.com', password: 'wrong' };
      (service.validateUser as jest.Mock).mockResolvedValue(null);
      await expect(controller.login(dto)).rejects.toThrow(UnauthorizedException);
      expect(service.validateUser).toHaveBeenCalledWith(dto.email, dto.password);
    });
  });

  describe('register', () => {
    it('should call service.register and return result', async () => {
      const dto = { email: 'new@mail.com', password: 'pass', name: 'Test', firstName: 'Test' };
      const registerResult = { access_token: 'token' };
      (service.register as jest.Mock).mockResolvedValue(registerResult);
      const result = await controller.register(dto);
      expect(service.register).toHaveBeenCalledWith(dto);
      expect(result).toEqual(registerResult);
    });
  });
});