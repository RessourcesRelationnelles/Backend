import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from '../entities/utilisateurs/utilisateur.entity';
import { UpdateUserDto } from '../dto/utilisateurs.dto';

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

  // Mettre à jour un utilisateur
  async update(id: number, updateData: UpdateUserDto): Promise<Utilisateur> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

  // Supprimer un utilisateur
  async delete(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
  }

}
