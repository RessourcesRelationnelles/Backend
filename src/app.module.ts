import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Utilisateur } from './entities/utilisateurs/utilisateur.entity';
import { Categorie } from './entities/categories/categorie.entity';
import { Ressource } from './entities/ressources/ressource.entity';
import { Commentaire } from './entities/commentaires/commentaire.entity';
import { Favori } from './entities/favoris/favori.entity';
import { Statistique } from './entities/statistiques/statistique.entity';
import { UsersModule } from './modules/utilisateur.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Utilisateur, Categorie, Ressource, Commentaire, Favori, Statistique],
      synchronize: true,
      autoLoadEntities: true
    }),
    UsersModule,
  ],
})
export class AppModule {}