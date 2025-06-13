import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commentaire } from './commentaire.entity';
import { CreateCommentaireDto } from './commentaire.dto';
import { User } from '../user/user.entity';
import { Ressource } from '../ressource/ressource.entity';

@Injectable()
export class CommentaireService {
  constructor(
    @InjectRepository(Commentaire)
    private commentaireRepo: Repository<Commentaire>,

    @InjectRepository(Ressource)
    private ressourceRepo: Repository<Ressource>
  ) {}

  async create(ressourceId: string, dto: CreateCommentaireDto, user: User) {
    const ressource = await this.ressourceRepo.findOne({ where: { id: ressourceId } });
    if (!ressource) throw new NotFoundException('Ressource non trouvée');

    const commentaire = this.commentaireRepo.create({
      contenu: dto.contenu,
      auteur: user,
      ressource,
    });

    return this.commentaireRepo.save(commentaire);
  }

  findAll() {
    return this.commentaireRepo.find({ relations: ['ressource', 'auteur'] });
  }

  findByRessource(ressourceId: string) {
    return this.commentaireRepo.find({
      where: { ressource: { id: ressourceId } },
      relations: ['auteur'],
    });
  }
}
