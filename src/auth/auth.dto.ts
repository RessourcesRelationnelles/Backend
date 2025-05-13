import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../user/user.entity';

export class AuthRegisterDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  firstName?: string;

  @ApiProperty({ enum: Role, required: false, default: Role.CITOYEN })
  role?: Role;
}

export class AuthLoginDto {
    @ApiProperty()
    email: string;
  
    @ApiProperty()
    password: string;
  }
  
