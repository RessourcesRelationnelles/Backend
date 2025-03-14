import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Categorie } from '../categories/categorie.entity';
import { Utilisateur } from '../utilisateurs/utilisateur.entity';

export enum Statut {
  PRIVE = 'privé',
  PARTAGE = 'partagé',
  PUBLIC = 'public',
}

@Entity('Ressources')
export class Ressource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  titre: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Categorie, (categorie) => categorie.ressources, { nullable: true, onDelete: 'SET NULL' })
  categorie: Categorie;

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.ressources, { nullable: true, onDelete: 'SET NULL' })
  utilisateur: Utilisateur;

  @Column({ type: 'enum', enum: Statut, default: Statut.PUBLIC })
  statut: Statut;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation: Date;
}
