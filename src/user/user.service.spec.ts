import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, Role } from './user.entity';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: Partial<Repository<User>>;

  beforeEach(async () => {
    repository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

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

  describe('create', () => {
    it('should create and save a new user', async () => {
      (repository.create as jest.Mock).mockReturnValue(mockUser);
      (repository.save as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.create(mockUser);
      expect(repository.create).toHaveBeenCalledWith(mockUser);
      expect(repository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      (repository.find as jest.Mock).mockResolvedValue([mockUser]);

      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findByString', () => {
    it('should find a user by email', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findByString(mockUser.email);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { email: mockUser.email } });
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateData = { bio: 'Nouvelle bio' };
      (repository.findOne as jest.Mock).mockResolvedValue({ ...mockUser });
      (repository.save as jest.Mock).mockResolvedValue({ ...mockUser, ...updateData });

      const result = await service.update(mockUser.id, updateData);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: mockUser.id } });
      expect(repository.save).toHaveBeenCalledWith({ ...mockUser, ...updateData });
      expect(result).toEqual({ ...mockUser, ...updateData });
    });
  });

  describe('remove', () => {
    it('should delete a user by email', async () => {
      (repository.delete as jest.Mock).mockResolvedValue({ affected: 1, raw: [] });
      const result = await service.remove(mockUser.email);
      expect(repository.delete).toHaveBeenCalledWith({ email: mockUser.email });
      expect(result).toEqual({ affected: 1, raw: [] });
    });
  });

  describe('removeById', () => {
    it('should delete a user by id', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(mockUser);
      (repository.delete as jest.Mock).mockResolvedValue({ affected: 1, raw: [] });
      const result = await service.removeById(mockUser.id);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: mockUser.id } });
      expect(repository.delete).toHaveBeenCalledWith({ id: mockUser.id });
      expect(result).toEqual({ message: 'Compte supprimé avec succès.' });
    });
  });

  describe('followOrUnfollow', () => {
    it('should follow a user', async () => {
      const currentUser = { ...mockUser, following: [] };
      const targetUser = { ...mockUser, id: 'target-id' };
      (repository.findOne as jest.Mock)
        .mockResolvedValueOnce(currentUser) // find current user
        .mockResolvedValueOnce(targetUser); // find target user
      (repository.save as jest.Mock).mockResolvedValue({ ...currentUser, following: [targetUser] });
      const result = await service.followOrUnfollow(currentUser.id, targetUser.id);
      expect(result).toEqual({ message: 'Abonnement réussi.' });
    });
    it('should unfollow a user', async () => {
      const targetUser = { ...mockUser, id: 'target-id' };
      const currentUser = { ...mockUser, following: [targetUser] };
      (repository.findOne as jest.Mock)
        .mockResolvedValueOnce(currentUser)
        .mockResolvedValueOnce(targetUser);
      (repository.save as jest.Mock).mockResolvedValue({ ...currentUser, following: [] });
      const result = await service.followOrUnfollow(currentUser.id, targetUser.id);
      expect(result).toEqual({ message: 'Désabonnement réussi.' });
    });
  });

  describe('getFollowing', () => {
    it('should return following users', async () => {
      const following = [{ id: '2', name: 'A', firstName: 'B', photoDeProfil: 'x.jpg' }];
      (repository.findOne as jest.Mock).mockResolvedValue({ ...mockUser, following });
      const result = await service.getFollowing(mockUser.id);
      expect(result).toEqual(following);
    });
  });

  describe('getFollowers', () => {
    it('should return followers users', async () => {
      const followers = [{ id: '2', name: 'A', firstName: 'B', photoDeProfil: 'x.jpg' }];
      (repository.findOne as jest.Mock).mockResolvedValue({ ...mockUser, followers });
      const result = await service.getFollowers(mockUser.id);
      expect(result).toEqual(followers);
    });
  });
});
