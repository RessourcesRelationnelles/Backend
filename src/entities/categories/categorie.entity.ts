import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ressource } from '../ressources/ressource.entity';

@Entity('Categories')
export class Categorie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  nom: string;

  @OneToMany(() => Ressource, (ressource) => ressource.categorie)
  ressources: Ressource[];
}
