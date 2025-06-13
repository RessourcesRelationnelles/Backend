import { Controller, Post, Body, Param, UseGuards, Req, Get } from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CreateCommentaireDto } from './commentaire.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiResponse, ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@Controller('ressources/:ressourceId/commentaires')
export class CommentaireController {
  constructor(private readonly commentaireService: CommentaireService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Param('ressourceId') ressourceId: string, @Body() dto: CreateCommentaireDto, @Req() req) {
    return this.commentaireService.create(ressourceId, dto, req.user);
  }

  @Get()
  findAll(@Param('ressourceId') ressourceId: string) {
    return this.commentaireService.findByRessource(ressourceId);
  }
}
