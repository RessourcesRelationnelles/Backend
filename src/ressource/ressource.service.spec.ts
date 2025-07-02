import { Test, TestingModule } from '@nestjs/testing';
import { RessourceService } from './ressource.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ressource } from './ressource.entity';
import { User } from '../user/user.entity';
import { Commentaire } from '../commentaire/commentaire.entity';
import { Repository } from 'typeorm';

describe('RessourceService', () => {
  let service: RessourceService;
  let ressourceRepo: Partial<Repository<Ressource>>;
  let userRepo: Partial<Repository<User>>;
  let commentaireRepo: Partial<Repository<Commentaire>>;

  const mockRessource = { id: 'r1', titre: 'Titre', auteur: { id: 'u1' }, date: new Date() };
  const mockUser = { id: 'u1' };

  beforeEach(async () => {
    ressourceRepo = {
      find: jest.fn().mockResolvedValue([mockRessource]),
      findOne: jest.fn().mockResolvedValue(mockRessource),
      create: jest.fn().mockReturnValue(mockRessource),
      save: jest.fn().mockResolvedValue(mockRessource),
    };
    userRepo = {
      findOne: jest.fn().mockResolvedValue(mockUser),
    };
    commentaireRepo = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RessourceService,
        { provide: getRepositoryToken(Ressource), useValue: ressourceRepo },
        { provide: getRepositoryToken(User), useValue: userRepo },
        { provide: getRepositoryToken(Commentaire), useValue: commentaireRepo },
      ],
    }).compile();
    service = module.get<RessourceService>(RessourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all ressources', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockRessource]);
    expect(ressourceRepo.find).toHaveBeenCalled();
  });

  it('should return one ressource', async () => {
    const result = await service.findOne('r1');
    expect(result).toEqual(mockRessource);
    expect(ressourceRepo.findOne).toHaveBeenCalledWith({ where: { id: 'r1' } });
  });

  it('should create a ressource', async () => {
    const dto = { titre: 'Titre', description: 'desc' };
    const result = await service.create(dto as any, mockUser as any);
    expect(ressourceRepo.create).toHaveBeenCalledWith({ ...dto, auteur: mockUser });
    expect(ressourceRepo.save).toHaveBeenCalled();
    expect(result).toEqual(mockRessource);
  });

});
