import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from '../services/utilisateur.service';
import { Utilisateur } from '../entities/utilisateurs/utilisateur.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

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
  @ApiBody({ schema: { example: { id :"" , nom: '', email: '', mot_de_passe: '', role: '', date_creation: '', } } })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès' })
  async create(@Body() userData: Partial<Utilisateur>): Promise<Utilisateur> {
    return this.usersService.create(userData);
  }
}
