import { Repository } from 'typeorm';
import { Utilisateur } from '../entities/utilisateurs/utilisateur.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<Utilisateur>);
    findAll(): Promise<Utilisateur[]>;
    create(userData: Partial<Utilisateur>): Promise<Utilisateur>;
}
