import { Module } from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CommentaireController } from './commentaire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commentaire } from './commentaire.entity';
import { Ressource } from '../ressource/ressource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commentaire, Ressource])],
  controllers: [CommentaireController],
  providers: [CommentaireService]
})
export class CommentaireModule {}
