import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../user/user.entity';

export class AuthRegisterDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  mot_de_passe: string;

  @ApiProperty({ required: false })
  nom?: string;

  @ApiProperty({ required: false })
  prenom?: string;

  @ApiProperty({ enum: Role, required: false })
  role?: Role;
}

export class AuthLoginDto {
    @ApiProperty()
    email: string;
  
    @ApiProperty()
    mot_de_passe: string;
  }
  
