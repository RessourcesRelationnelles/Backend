import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

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
  pseudo: string;

  @Column({ length: 100, nullable: true })
  bio: string;

  @Column({ nullable: true })
  photoDeProfil: string;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ length: 100, nullable: true })
  firstName: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.CITOYEN })
  role: Role;

  @CreateDateColumn({ name: 'date_creation' })
  dateCreation: Date;

  @Column({ default: true })
  is_active: boolean;

  @ManyToMany(() => User, user => user.following)
  @JoinTable({
    name: 'user_followers',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'follower_id', referencedColumnName: 'id' },
  })
  followers: User[];

  @ManyToMany(() => User, user => user.followers)
  following: User[];

}
