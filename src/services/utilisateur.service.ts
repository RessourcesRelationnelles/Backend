import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from '../entities/utilisateurs/utilisateur.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Utilisateur)
    private usersRepository: Repository<Utilisateur>,
  ) {}

  // Récupérer tous les utilisateurs
  async findAll(): Promise<Utilisateur[]> {
    return this.usersRepository.find();
  }

  // Créer un utilisateur
  async create(userData: Partial<Utilisateur>): Promise<Utilisateur> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }
}
