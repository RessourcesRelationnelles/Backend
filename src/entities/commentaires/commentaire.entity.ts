import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Ressource } from '../ressources/ressource.entity';
import { Utilisateur } from '../utilisateurs/utilisateur.entity';

@Entity('Commentaires')
export class Commentaire {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ressource, (ressource) => ressource.id, { onDelete: 'CASCADE' })
  ressource: Ressource;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.commentaires, { onDelete: 'CASCADE' })
  utilisateur: Utilisateur;

  @Column('text')
  contenu: string;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation: Date;
}
