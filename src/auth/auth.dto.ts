import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../user/user.entity';

export class AuthRegisterDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  firstName: string;

}

export class AuthLoginDto {
    @ApiProperty()
    email: string;
  
    @ApiProperty()
    password: string;
  }

