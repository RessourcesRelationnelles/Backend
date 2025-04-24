import { Role } from '../user/user.entity';
export declare class UserUpdateDto {
    email?: string;
    mot_de_passe?: string;
    nom?: string;
    prenom?: string;
    role?: Role;
}
