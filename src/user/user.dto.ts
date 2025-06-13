import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../user/user.entity';

export class UserUpdateDto {
  @ApiProperty({ required: false })
  pseudo?: string;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false })
  photoDeProfil?: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  firstName?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  password?: string;

  @ApiProperty({ enum: Role, required: false })
  role?: Role;
}