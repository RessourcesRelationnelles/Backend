import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ressource } from './ressource.entity';
import { CreateRessourceDto, CommentRessourceDto } from './ressource.dto';
import { User } from '../user/user.entity';
import { Commentaire } from '../commentaire/commentaire.entity';

@Injectable()
export class RessourceService {
  constructor(
    @InjectRepository(Ressource)
    private ressourceRepository: Repository<Ressource>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Commentaire)
    private commentaireRepo: Repository<Commentaire>,
  ) {}

  findAll() {
    return this.ressourceRepository.find();
  }

  async findOne(id: string) {
    const ressource = await this.ressourceRepository.findOne({ where: { id } });
    if (!ressource) throw new NotFoundException('Ressource non trouvée');
    return ressource;
  }

  async create(dto: CreateRessourceDto, auteur: User) {
    const ressource = this.ressourceRepository.create({ ...dto, auteur });
    return this.ressourceRepository.save(ressource);
  }

  async like(id: string) {
    const ressource = await this.findOne(id);
    ressource.likes += 1;
    return this.ressourceRepository.save(ressource);
  }

  async comment(ressourceId: string, dto: CommentRessourceDto) {
  const ressource = await this.ressourceRepository.findOne({ where: { id: ressourceId } });
  if (!ressource) throw new NotFoundException('Ressource non trouvée');

  const auteur = await this.userRepo.findOne({ where: { id: dto.userId } });
  if (!auteur) throw new NotFoundException('Auteur non trouvé');

  const commentaire = this.commentaireRepo.create({
    contenu: dto.contenu,
    ressource,
    auteur,
  });

  return this.commentaireRepo.save(commentaire);
}


  async share(id: string, userId: string, destinataireId?: string) {
    const lienPartage = `https://app.com/ressources/${id}`;
    return {
      message: 'Ressource partagée avec succès',
      lienPartage,
      destinataire: destinataireId || 'non précisé',
    };
  }
}
