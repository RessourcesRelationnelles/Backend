import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Ressource } from '../ressources/ressource.entity';

@Entity('Statistiques')
export class Statistique {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ressource, { onDelete: 'CASCADE' })
  ressource: Ressource;

  @Column({ default: 0 })
  consultations: number;

  @Column({ default: 0 })
  partages: number;

  @UpdateDateColumn({ name: 'date_maj' })
  dateMaj: Date;
}
