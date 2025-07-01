import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Ressource } from '../ressource/ressource.entity';

@Entity('Commentaires')
export class Commentaire {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contenu: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  auteur: User;

  @ManyToOne(() => Ressource, ressource => ressource.commentaires, { onDelete: 'CASCADE' })
  ressource: Ressource;
}
