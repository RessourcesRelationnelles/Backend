import { UsersService } from '../services/utilisateur.service';
import { Utilisateur } from '../entities/utilisateurs/utilisateur.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<Utilisateur[]>;
    create(userData: Partial<Utilisateur>): Promise<Utilisateur>;
}
