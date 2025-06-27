import { Test, TestingModule } from '@nestjs/testing';
import { RessourceController } from './ressource.controller';
import { RessourceService } from './ressource.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRessourceDto } from './ressource.dto';

describe('RessourceController', () => {
  let controller: RessourceController;
  let service: Partial<Record<keyof RessourceService, jest.Mock>>;

  const mockRessource = { id: 'r1', titre: 'Titre', auteur: { id: 'u1' }, date: new Date() };
  const mockUser = { id: 'u1' };

  beforeEach(async () => {
    service = {
      findAll: jest.fn().mockResolvedValue([mockRessource]),
      findOne: jest.fn().mockResolvedValue(mockRessource),
      create: jest.fn().mockResolvedValue(mockRessource),
      like: jest.fn().mockResolvedValue({ message: 'liked' }),
      comment: jest.fn().mockResolvedValue({ message: 'commented' }),
      share: jest.fn().mockResolvedValue({ message: 'shared' }),
      findByFollowedUsers: jest.fn().mockResolvedValue([mockRessource]),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RessourceController],
      providers: [
        { provide: RessourceService, useValue: service },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();
    controller = module.get<RessourceController>(RessourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all ressources', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockRessource]);
  });

  it('should return one ressource', async () => {
    const result = await controller.findOne('r1');
    expect(service.findOne).toHaveBeenCalledWith('r1');
    expect(result).toEqual(mockRessource);
  });

  it('should create a ressource', async () => {
    const dto: CreateRessourceDto = { titre: 'Titre', description: 'desc' } as any;
    const req = { user: mockUser };
    const result = await controller.create(dto, req as any);
    expect(service.create).toHaveBeenCalledWith(dto, mockUser);
    expect(result).toEqual(mockRessource);
  });

  it('should like a ressource', async () => {
    const req = { user: mockUser };
    const result = await controller.like('r1', req as any);
    expect(service.like).toHaveBeenCalledWith('r1', mockUser.id);
    expect(result).toEqual({ message: 'liked' });
  });

  it('should comment a ressource', async () => {
    const dto = { userId: 'u1', contenu: 'test' };
    const result = await controller.comment('r1', dto);
    expect(service.comment).toHaveBeenCalledWith('r1', dto);
    expect(result).toEqual({ message: 'commented' });
  });

  it('should share a ressource', async () => {
    const dto = { userId: 'u1', destinataireId: 'u2' };
    const result = await controller.share('r1', dto);
    expect(service.share).toHaveBeenCalledWith('r1', 'u1', 'u2');
    expect(result).toEqual({ message: 'shared' });
  });

  it('should get ressources from followed users', async () => {
    const req = { user: mockUser };
    const result = await controller.getRessourcesFromFollowed(req as any);
    expect(service.findByFollowedUsers).toHaveBeenCalledWith(mockUser.id);
    expect(result).toEqual([mockRessource]);
  });
});
