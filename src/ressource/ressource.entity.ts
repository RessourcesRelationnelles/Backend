import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user/user.entity';
import { Commentaire } from '../commentaire/commentaire.entity';


@Entity('Ressources')
export class Ressource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titre: string;

  @Column()
  description: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  auteur: User;

  @Column({ type: 'int', default: 0 })
  likes: number;

  @OneToMany(() => Commentaire, commentaire => commentaire.ressource, { cascade: true })
  commentaires: Commentaire[];

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  likedBy: User[];

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
