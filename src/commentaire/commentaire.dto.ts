import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentaireDto {
  @IsString()
  @IsNotEmpty()
  contenu: string;
}
