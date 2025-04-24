import { AuthService } from './auth.service';
import { AuthLoginDto, AuthRegisterDto } from './auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: AuthLoginDto): Promise<{
        access_token: string;
    }>;
    register(body: AuthRegisterDto): Promise<import("../user/user.entity").User>;
}
