import { Repository } from 'typeorm';
import { Utilisateur } from '../entities/utilisateurs/utilisateur.entity';
import { UpdateUserDto } from '../dto/utilisateurs.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<Utilisateur>);
    findAll(): Promise<Utilisateur[]>;
    create(userData: Partial<Utilisateur>): Promise<Utilisateur>;
    update(id: number, updateData: UpdateUserDto): Promise<Utilisateur>;
    delete(id: number): Promise<void>;
}
