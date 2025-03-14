import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { UsersService } from '../services/utilisateur.service';
import { Utilisateur } from '../entities/utilisateurs/utilisateur.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../dto/utilisateurs.dto';

@ApiTags('Utilisateurs') // Catégorie Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs retournée avec succès' })
  async findAll(): Promise<Utilisateur[]> {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
  @ApiBody({ type: CreateUserDto})
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès' })
  async create(@Body() userData: Partial<Utilisateur>): Promise<Utilisateur> {
    return this.usersService.create(userData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour avec succès' })
  async update(@Param('id') id: number, @Body() updateData: UpdateUserDto): Promise<Utilisateur> {
    return this.usersService.update(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiResponse({ status: 200, description: 'Utilisateur supprimé avec succès' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }

}
