import {
  Controller, Get, Post, Param, Body, UseGuards, Req
} from '@nestjs/common';
import { RessourceService } from './ressource.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRessourceDto, CommentRessourceDto, ShareRessourceDto } from './ressource.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';


@Controller('ressources')
export class RessourceController {
  constructor(private readonly ressourceService: RessourceService) {}

  @Get()
  findAll() {
    return this.ressourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ressourceService.findOne(id);
  }

  @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBody({ type: CreateRessourceDto })
    create(@Body() dto: CreateRessourceDto, @Req() req) {
    return this.ressourceService.create(dto, req.user);
}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  like(@Param('id') id: string, @Req() req) {
    return this.ressourceService.like(id, req.user.id);
  }

  @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(':id/comment')
    @ApiBody({ type: CommentRessourceDto })
    comment(@Param('id') id: string, @Body() dto: CommentRessourceDto) {
    return this.ressourceService.comment(id, dto);
    }

  @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(':id/share')
    @ApiBody({ type: ShareRessourceDto })
    share(@Param('id') id: string, @Body() dto: ShareRessourceDto) {
    return this.ressourceService.share(id, dto.userId, dto.destinataireId);
    }
}
