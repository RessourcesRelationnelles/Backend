import { Controller, Post, Body, Get, Param, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './categorie.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../user/user.entity';

@Controller('categories')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @Get()
  findAll() {
    return this.categorieService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateCategorieDto, @Req() req) {
    const user = req.user;
    if (![Role.ADMINISTRATEUR, Role.SUPER_ADMINISTRATEUR].includes(user.role)) {
      throw new ForbiddenException('Accès réservé aux administrateurs.');
    }
    return this.categorieService.create(dto);
  }
}
