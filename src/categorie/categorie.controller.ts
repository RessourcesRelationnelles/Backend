import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './categorie.dto';

@Controller('categories')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @Get()
  findAll() {
    return this.categorieService.findAll();
  }

  @Post()
  create(@Body() dto: CreateCategorieDto) {
    return this.categorieService.create(dto);
  }
}
