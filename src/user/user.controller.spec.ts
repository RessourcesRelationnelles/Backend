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
    is_active: false,
    followers: [],
    following: []
  };

  const mockRequest = {
    user: {
      sub: 'uuid-123',
      id: 'uuid-123', // Ajouté pour correspondre à l'appel du contrôleur
      email: 'john.doe@example.com',
      role: Role.CITOYEN,
    },
  };

  beforeEach(async () => {
    userService = {
      findAll: jest.fn().mockResolvedValue([mockUser]),
      findByString: jest.fn(),
      findById: jest.fn(), 
      update: jest.fn(),
      remove: jest.fn().mockResolvedValue({ affected: 1 }),
      followOrUnfollow: jest.fn(),
      getFollowing: jest.fn(),
      getFollowers: jest.fn(),
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
    it('should return the user from request', async () => {
      userService.findById!.mockResolvedValue(mockUser);
      const req = { user: { id: mockUser.id } };
      const result = await controller.getProfile(req as any);
      expect(userService.findById).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateMe', () => {
    it('should update the user info', async () => {
      const updateDto: UserUpdateDto = { bio: 'Nouvelle bio', password: 'newpassword' };
      userService.update!.mockResolvedValue({ affected: 1 });
      const result = await controller.update(mockRequest as any, updateDto);
      expect(userService.update).toHaveBeenCalledWith('uuid-123', updateDto);
      expect(result).toEqual({ affected: 1 });
    });

    it('should throw NotFoundException if update fails', async () => {
      userService.update!.mockResolvedValue(null);

      await expect(
        controller.update(mockRequest as any, { bio: 'fail', password: 'dummy' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeByEmail', () => {
  it('should call userService.remove with correct email', async () => {
    userService.findById!.mockResolvedValue({ ...mockUser, role: Role.ADMINISTRATEUR });
    const req = { user: { id: mockUser.id, role: Role.ADMINISTRATEUR } };
    const result = await controller.removeByEmail(req as any, mockUser.email);
    expect(userService.remove).toHaveBeenCalledWith(mockUser.email);
    expect(result).toEqual({ affected: 1 });
    });
  });

  describe('followOrUnfollow', () => {
    it('should call userService.followOrUnfollow and return message', async () => {
      userService.followOrUnfollow = jest.fn().mockResolvedValue({ message: 'Abonnement réussi.' });
      const req = { user: { id: 'uuid-123' } };
      const result = await controller.followOrUnfollow(req as any, 'target-id');
      expect(userService.followOrUnfollow).toHaveBeenCalledWith('uuid-123', 'target-id');
      expect(result).toEqual({ message: 'Abonnement réussi.' });
    });
  });

  describe('getFollowing', () => {
    it('should return following users', async () => {
      const following = [{ id: '2', name: 'A', firstName: 'B', photoDeProfil: 'x.jpg' }];
      userService.getFollowing = jest.fn().mockResolvedValue(following);
      const result = await controller.getFollowing('uuid-123');
      expect(userService.getFollowing).toHaveBeenCalledWith('uuid-123');
      expect(result).toEqual(following);
    });
  });

  describe('getFollowers', () => {
    it('should return followers users', async () => {
      const followers = [{ id: '2', name: 'A', firstName: 'B', photoDeProfil: 'x.jpg' }];
      userService.getFollowers = jest.fn().mockResolvedValue(followers);
      const result = await controller.getFollowers('uuid-123');
      expect(userService.getFollowers).toHaveBeenCalledWith('uuid-123');
      expect(result).toEqual(followers);
    });
  });
});
