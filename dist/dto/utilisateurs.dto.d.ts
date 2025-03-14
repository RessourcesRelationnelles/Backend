import { Role } from '../entities/utilisateurs/utilisateur.entity';
export declare class CreateUserDto {
    nom: string;
    prenom: string;
    email: string;
    mot_de_passe: string;
    role: Role;
}
export declare class UpdateUserDto {
    nom?: string;
    prenom?: string;
    email?: string;
    mot_de_passe?: string;
    role?: Role;
}
