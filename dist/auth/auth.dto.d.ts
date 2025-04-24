import { Role } from '../user/user.entity';
export declare class AuthRegisterDto {
    email: string;
    mot_de_passe: string;
    nom?: string;
    prenom?: string;
    role?: Role;
}
export declare class AuthLoginDto {
    email: string;
    mot_de_passe: string;
}
