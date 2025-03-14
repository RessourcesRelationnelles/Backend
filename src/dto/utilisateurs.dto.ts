import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../entities/utilisateurs/utilisateur.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  nom: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  prenom: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  mot_de_passe: string;

  @ApiProperty({ example: 'citoyen', enum: Role })
  @IsEnum(Role)
  role: Role;

}

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  nom?: string;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  prenom?: string;

  @ApiProperty({ example: 'john@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'newpassword123', required: false, minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  mot_de_passe?: string;

  @ApiProperty({ example: 'modérateur', required: false, enum: Role })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
