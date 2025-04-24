import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

export enum Role {
  CITOYEN = 'citoyen',
  MODERATEUR = 'modérateur',
  ADMINISTRATEUR = 'administrateur',
  SUPER_ADMINISTRATEUR = 'super-administrateur',
}

@Entity('Utilisateurs')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nom: string;

  @Column({ length: 100 })
  prenom: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  mot_de_passe: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation: Date;

}
