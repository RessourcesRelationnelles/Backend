import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Ressource } from '../ressources/ressource.entity';
import { Utilisateur } from '../utilisateurs/utilisateur.entity';

@Entity('Favoris')
export class Favori {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.favoris, { onDelete: 'CASCADE' })
  utilisateur: Utilisateur;

  @ManyToOne(() => Ressource, { onDelete: 'CASCADE' })
  ressource: Ressource;

  @CreateDateColumn({ name: 'date_ajout' })
  dateAjout: Date;
}
