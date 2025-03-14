import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../services/utilisateur.service';
import { Utilisateur } from '../entities/utilisateurs/utilisateur.entity';
import { UsersController } from '../controllers/utilisateurs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Utilisateur])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Permet d'utiliser le service ailleurs
})
export class UsersModule {}
