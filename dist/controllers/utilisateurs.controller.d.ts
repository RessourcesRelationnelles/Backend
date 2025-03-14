import { UsersService } from '../services/utilisateur.service';
import { Utilisateur } from '../entities/utilisateurs/utilisateur.entity';
import { UpdateUserDto } from '../dto/utilisateurs.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<Utilisateur[]>;
    create(userData: Partial<Utilisateur>): Promise<Utilisateur>;
    update(id: number, updateData: UpdateUserDto): Promise<Utilisateur>;
    delete(id: number): Promise<void>;
}
