import { Role } from '../user/user.entity';
export declare class AuthRegisterDto {
    email: string;
    password: string;
    name?: string;
    firstName?: string;
    role?: Role;
}
export declare class AuthLoginDto {
    email: string;
    password: string;
}
