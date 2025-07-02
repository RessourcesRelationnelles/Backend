import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categorie } from './categorie.entity';
import { CreateCategorieDto } from './categorie.dto';

@Injectable()
export class CategorieService {
  constructor(
    @InjectRepository(Categorie)
    private categorieRepo: Repository<Categorie>
  ) {}

  findAll() {
    return this.categorieRepo.find();
  }

  async create(dto: CreateCategorieDto) {
    const categorie = this.categorieRepo.create(dto);
    return this.categorieRepo.save(categorie);
  }

  async findOneById(id: string) {
    const categorie = await this.categorieRepo.findOne({ where: { id } });
    if (!categorie) throw new NotFoundException('Catégorie non trouvée');
    return categorie;
  }
}
