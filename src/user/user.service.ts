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

    if (userData.password) {
      const bcryptjs = await import('bcryptjs');
      userData.password = await bcryptjs.hash(userData.password, 10);
    }

    Object.assign(user, userData);
    return this.userRepository.save(user);
  }

  async setActiveStatus(id: string, isActive: boolean): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    user.is_active = isActive;
    return this.userRepository.save(user);
  }

  async createAdmin(userData: Partial<User>): Promise<User> {
    if (userData.password) {
      const bcryptjs = await import('bcryptjs');
      userData.password = await bcryptjs.hash(userData.password, 10);
    }
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }


  async remove(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    await this.userRepository.delete({ email });
    return { message: 'Compte supprimé avec succès.' };
  }

  async removeById(id: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
        throw new NotFoundException('Utilisateur non trouvé');
    }
    await this.userRepository.delete({ id });
    return { message: 'Compte supprimé avec succès.' };
  }

  async followOrUnfollow(currentUserId: string, targetUserId: string): Promise<{ message: string }> {
    if (currentUserId === targetUserId) {
      return { message: "Vous ne pouvez pas vous suivre vous-même." };
    }
    const currentUser = await this.userRepository.findOne({ where: { id: currentUserId }, relations: ['following'] });
    const targetUser = await this.userRepository.findOne({ where: { id: targetUserId } });
    if (!currentUser || !targetUser) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    const isFollowing = currentUser.following.some(u => u.id === targetUserId);
    if (isFollowing) {
      currentUser.following = currentUser.following.filter(u => u.id !== targetUserId);
      await this.userRepository.save(currentUser);
      return { message: 'Désabonnement réussi.' };
    } else {
      currentUser.following.push(targetUser);
      await this.userRepository.save(currentUser);
      return { message: 'Abonnement réussi.' };
    }
  }

  async getFollowing(userId: string): Promise<Partial<User>[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['following'] });
    if (!user) throw new NotFoundException('Utilisateur non trouvé');
    return user.following.map(u => ({ id: u.id, name: u.name, firstName: u.firstName, photoDeProfil: u.photoDeProfil }));
  }

  async getFollowers(userId: string): Promise<Partial<User>[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['followers'] });
    if (!user) throw new NotFoundException('Utilisateur non trouvé');
    return user.followers.map(u => ({ id: u.id, name: u.name, firstName: u.firstName, photoDeProfil: u.photoDeProfil }));
  }

}
