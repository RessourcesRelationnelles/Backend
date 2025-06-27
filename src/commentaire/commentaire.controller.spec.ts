import { Test, TestingModule } from '@nestjs/testing';
import { CommentaireController } from './commentaire.controller';
import { CommentaireService } from './commentaire.service';

describe('CommentaireController', () => {
  let controller: CommentaireController;
  let service: Partial<Record<keyof CommentaireService, jest.Mock>>;

  beforeEach(async () => {
    service = {
      create: jest.fn(),
      findByRessource: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentaireController],
      providers: [
        { provide: CommentaireService, useValue: service },
      ],
    }).compile();
    controller = module.get<CommentaireController>(CommentaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create and return result', async () => {
      const req = { user: { id: 'u1' } };
      const dto = { contenu: 'test' };
      const res = { id: 'c1', contenu: 'test' };
      (service.create as jest.Mock).mockResolvedValue(res);
      const result = await controller.create('r1', dto, req as any);
      expect(service.create).toHaveBeenCalledWith('r1', dto, req.user);
      expect(result).toEqual(res);
    });
  });

  describe('findAll', () => {
    it('should call service.findByRessource and return result', async () => {
      (service.findByRessource as jest.Mock).mockResolvedValue(['c1']);
      const result = await controller.findAll('r1');
      expect(service.findByRessource).toHaveBeenCalledWith('r1');
      expect(result).toEqual(['c1']);
    });
  });
});
