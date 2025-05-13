// src/auth/dto/auth-register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../user/user.entity';

export class UserUpdateDto {
  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  pseudo?: string;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false })
  photoDeProfil?: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ required: false })
  nom?: string;

  @ApiProperty({ required: false })
  prenom?: string;

  @ApiProperty({ enum: Role, required: false })
  role?: Role;
}

  
