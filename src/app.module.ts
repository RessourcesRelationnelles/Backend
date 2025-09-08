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

// Debug: print non-sensitive DB connection info to help diagnose failures (will not print passwords)
try {
  let debugInfo = 'DB config: ';
  if (process.env.DATABASE_URL) {
    try {
      const u = new URL(process.env.DATABASE_URL);
      debugInfo += `using DATABASE_URL host=${u.hostname} port=${u.port || '3306'} user=${u.username} db=${u.pathname?.replace('/', '')}`;
    } catch (e) {
      debugInfo += 'DATABASE_URL present but not parseable';
    }
  } else {
    debugInfo += `host=${process.env.DB_HOST || 'unset'} port=${process.env.DB_PORT || 'unset'} user=${process.env.DB_USER || 'unset'} db=${process.env.DB_NAME || 'unset'}`;
  }
  // eslint-disable-next-line no-console
  console.log('[DB DEBUG]', debugInfo);
} catch (err) {
  // ignore debug logging errors
}

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