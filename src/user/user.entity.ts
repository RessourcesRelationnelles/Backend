import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

export enum Role {
  CITOYEN = 'citoyen',
  MODERATEUR = 'modérateur',
  ADMINISTRATEUR = 'administrateur',
  SUPER_ADMINISTRATEUR = 'super-administrateur',
}

@Entity('Utilisateurs')
export class User {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column({ length: 100, nullable: true })
  nom: string;

  @Column({ length: 100, nullable: true })
  prenom: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  mot_de_passe: string;

  @Column({ type: 'enum', enum: Role, default: Role.CITOYEN })
  role: Role;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation: Date;

}
