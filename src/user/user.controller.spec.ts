import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NotFoundException } from '@nestjs/common';
import { UserUpdateDto } from './user.dto';
import { Role, User } from './user.entity';

describe('UserController', () => {
  let controller: UserController;
  let userService: Partial<Record<keyof UserService, jest.Mock>>;

  const mockUser: User = {
    id: 'uuid-123',
    pseudo: 'testuser',
    bio: 'Je suis testeur',
    photoDeProfil: 'photo.jpg',
    name: 'Doe',
    firstName: 'John',
    email: 'john.doe@example.com',
    password: 'hashedpassword',
    role: Role.CITOYEN,
    dateCreation: new Date(),
  };

  const mockRequest = {
    user: {
      sub: 'uuid-123',
      email: 'john.doe@example.com',
      role: Role.CITOYEN,
    },
  };

  beforeEach(async () => {
    userService = {
      findAll: jest.fn().mockResolvedValue([mockUser]),
      findByString: jest.fn(),
      update: jest.fn(),
      remove: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await controller.findAll();
      expect(userService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findByEmail', () => {
    it('should return user by email', async () => {
      userService.findByString!.mockResolvedValue(mockUser);

      const result = await controller.findByEmail(mockUser.email);
      expect(userService.findByString).toHaveBeenCalledWith(mockUser.email);
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      userService.findByString!.mockResolvedValue(null);

      await expect(controller.findByEmail('notfound@example.com')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getProfile', () => {
    it('should return the user from request', () => {
      const result = controller.getProfile(mockRequest as any);
      expect(result).toEqual(mockRequest.user);
    });
  });

  describe('updateMe', () => {
    it('should update the user info', async () => {
      const updateDto: UserUpdateDto = { bio: 'Nouvelle bio', password: 'newpassword' };
      userService.update!.mockResolvedValue({ affected: 1 });

      const result = await controller.updateMe(mockRequest as any, updateDto);
      expect(userService.update).toHaveBeenCalledWith('uuid-123', updateDto);
      expect(result).toEqual({ affected: 1 });
    });

    it('should throw NotFoundException if update fails', async () => {
      userService.update!.mockResolvedValue(null);

      await expect(
        controller.updateMe(mockRequest as any, { bio: 'fail', password: 'dummy' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should call userService.remove with correct ID', async () => {
      const result = await controller.remove(1);
      expect(userService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual({ affected: 1 });
    });
  });
});
