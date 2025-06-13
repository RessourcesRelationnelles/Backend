import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ressource } from './ressource.entity';
import { RessourceService } from './ressource.service';
import { RessourceController } from './ressource.controller';
import { User } from '../user/user.entity';
import { Commentaire } from '../commentaire/commentaire.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ressource, User, Commentaire])
  ],
  controllers: [RessourceController],
  providers: [RessourceService],
  exports: [RessourceService],
})
export class RessourceModule {}