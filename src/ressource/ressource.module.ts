import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ressource } from './ressource.entity';
import { RessourceService } from './ressource.service';
import { RessourceController } from './ressource.controller';
import { User } from '../user/user.entity';
import { Commentaire } from '../commentaire/commentaire.entity';
import { Categorie } from '../categorie/categorie.entity';
import { CategorieModule } from '../categorie/categorie.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ressource, User, Commentaire, Categorie]),
    CategorieModule
  ],
  controllers: [RessourceController],
  providers: [RessourceService],
  exports: [RessourceService],
})
export class RessourceModule {}