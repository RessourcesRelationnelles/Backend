import { Test, TestingModule } from '@nestjs/testing';
import { CommentaireService } from './commentaire.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Commentaire } from './commentaire.entity';
import { Ressource } from '../ressource/ressource.entity';
import { User } from '../user/user.entity';

describe('CommentaireService', () => {
  let service: CommentaireService;
  let commentaireRepo: any;
  let ressourceRepo: any;

  beforeEach(async () => {
    commentaireRepo = { create: jest.fn(), save: jest.fn(), find: jest.fn() };
    ressourceRepo = { findOne: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentaireService,
        { provide: getRepositoryToken(Commentaire), useValue: commentaireRepo },
        { provide: getRepositoryToken(Ressource), useValue: ressourceRepo },
      ],
    }).compile();
    service = module.get<CommentaireService>(CommentaireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a commentaire', async () => {
      const ressource = { id: 'r1' } as Ressource;
      const user = { id: 'u1', pseudo: '', bio: '', photoDeProfil: '', name: '', firstName: '', email: '', password: '', role: 0 as any, dateCreation: new Date(), is_active: true, followers: [], following: [] } as User;
      const dto = { contenu: 'test' };
      ressourceRepo.findOne.mockResolvedValue(ressource);
      commentaireRepo.create.mockReturnValue({ ...dto, auteur: user, ressource });
      commentaireRepo.save.mockResolvedValue({ ...dto, auteur: user, ressource });
      const result = await service.create('r1', dto, user);
      expect(result).toEqual({ ...dto, auteur: user, ressource });
      expect(commentaireRepo.create).toHaveBeenCalledWith({ contenu: 'test', auteur: user, ressource });
      expect(commentaireRepo.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all commentaires', async () => {
      commentaireRepo.find.mockResolvedValue(['c1', 'c2']);
      const result = await service.findAll();
      expect(result).toEqual(['c1', 'c2']);
    });
  });

  describe('findByRessource', () => {
    it('should return commentaires for a ressource', async () => {
      commentaireRepo.find.mockResolvedValue(['c1']);
      const result = await service.findByRessource('r1');
      expect(result).toEqual(['c1']);
      expect(commentaireRepo.find).toHaveBeenCalledWith({ where: { ressource: { id: 'r1' } }, relations: ['auteur'] });
    });
  });
});
