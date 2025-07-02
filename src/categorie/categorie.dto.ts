import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategorieDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nom: string;
}
