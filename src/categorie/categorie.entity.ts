import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ressource } from '../ressource/ressource.entity';

@Entity('Categories')
export class Categorie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nom: string;

  @OneToMany(() => Ressource, ressource => ressource.categorie)
  ressources: Ressource[];
}
