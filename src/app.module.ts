import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { Ressource } from './ressource/ressource.entity';
import { RessourceModule } from './ressource/ressource.module';
import { CommentaireModule } from './commentaire/commentaire.module';
import { Commentaire } from './commentaire/commentaire.entity';

const typeormSynchronize =
  process.env.TYPEORM_SYNC !== undefined
    ? process.env.TYPEORM_SYNC === 'true'
    : true;

const useDatabaseUrl = !!process.env.DATABASE_URL;

const typeOrmConfig = useDatabaseUrl
  ? {
      type: 'mysql' as const,
      url: process.env.DATABASE_URL,
      entities: [User, Ressource, Commentaire],
      synchronize: typeormSynchronize,
      autoLoadEntities: true,
      // If you need SSL for the connection (some Railway setups), set DB_SSL=true in env
      extra:
        process.env.DB_SSL === 'true'
          ? { ssl: { rejectUnauthorized: false } }
          : undefined,
    }
  : {
      type: 'mysql' as const,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Ressource, Commentaire],
      synchronize: typeormSynchronize,
      autoLoadEntities: true,
      extra:
        process.env.DB_SSL === 'true'
          ? { ssl: { rejectUnauthorized: false } }
          : undefined,
    };

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    RessourceModule,
    CommentaireModule,
  ],
})
export class AppModule {}