import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Ressource } from '../ressources/ressource.entity';
import { Commentaire } from '../commentaires/commentaire.entity';
import { Favori } from '../favoris/favori.entity';

export enum Role {
  CITOYEN = 'citoyen',
  MODERATEUR = 'modérateur',
  ADMINISTRATEUR = 'administrateur',
  SUPER_ADMINISTRATEUR = 'super-administrateur',
}

@Entity('Utilisateurs')
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nom: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  mot_de_passe: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation: Date;

  @OneToMany(() => Ressource, (ressource) => ressource.utilisateur)
  ressources: Ressource[];

  @OneToMany(() => Commentaire, (commentaire) => commentaire.utilisateur)
  commentaires: Commentaire[];

  @OneToMany(() => Favori, (favori) => favori.utilisateur)
  favoris: Favori[];
}
