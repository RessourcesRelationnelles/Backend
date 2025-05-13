import { Role } from '../user/user.entity';
export declare class UserUpdateDto {
    email?: string;
    pseudo?: string;
    bio?: string;
    photoDeProfil?: string;
    password: string;
    nom?: string;
    prenom?: string;
    role?: Role;
}
