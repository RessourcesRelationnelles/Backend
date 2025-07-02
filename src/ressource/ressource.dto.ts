import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRessourceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  titre: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'ID de la catégorie' })
  categorieId: string;
}

export class LikeRessourceDto {
  @IsUUID()
  @ApiProperty()
  userId: string;
}

export class CommentRessourceDto {
  @IsUUID()
  @ApiProperty()
  userId: string;

  @IsString()
  @ApiProperty()
  contenu: string;
}

export class ShareRessourceDto {
  @IsUUID()
  @ApiProperty()
  userId: string;

  @IsOptional()
  @ApiProperty()
  @IsUUID()
  destinataireId?: string;
}

export class UpdateRessourceDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  titre?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description?: string;
}
