import { UserService } from './user.service';
import { UserUpdateDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("./user.entity").User[]>;
    getProfile(req: any): any;
    findByEmail(email: string): Promise<import("./user.entity").User>;
    updateMe(req: any, body: UserUpdateDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
