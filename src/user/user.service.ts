import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(userData: Partial<User>) {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }


  findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }


  findByString(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    Object.assign(user, userData);
    return this.userRepository.save(user);
  }


  remove(email: string) {
  return this.userRepository.delete({ email });
  }

  async removeById(id: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
        throw new NotFoundException('Utilisateur non trouvé');
    }
    await this.userRepository.delete({ id });
    return { message: 'Compte supprimé avec succès.' };
}



}
