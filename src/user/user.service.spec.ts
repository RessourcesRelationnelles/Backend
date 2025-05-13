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
      (repository.update as jest.Mock).mockResolvedValue({ affected: 1, generatedMaps: [], raw: [] });

      const result = await service.update(mockUser.id as any, updateData);
      expect(repository.update).toHaveBeenCalledWith(mockUser.id, updateData);
      expect(result).toEqual({ affected: 1, generatedMaps: [], raw: [] });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      (repository.delete as jest.Mock).mockResolvedValue({ affected: 1, raw: [] });

      const result = await service.remove(mockUser.id as any);
      expect(repository.delete).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual({ affected: 1, raw: [] });
    });
  });
});
