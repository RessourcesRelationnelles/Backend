import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { UserUpdateDto } from './user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
    @ApiResponse({ status: 200, description: 'Liste des utilisateurs retournée avec succès' })
    findAll() {
        return this.userService.findAll();
    }

    @Get('email/:email')
    @ApiOperation({ summary: 'Récupérer un utilisateur par email' })
    async findByEmail(@Param('email') email: string) {
        const user = await this.userService.findByString(email);
        if (!user) {
            throw new NotFoundException('Utilisateur non trouvé');
        }
        return user;
    }
    
    @Put(':id')
    @ApiOperation({ summary: 'Mettre à jour un utilisateur avec son ID' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() body: UserUpdateDto) {
        const updatedUser = await this.userService.update(id, body);
        if (!updatedUser) {
            throw new NotFoundException("Impossible de mettre à jour l'utilisateur");
        }
        return updatedUser;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Supprimer un utilisateur avec son ID' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id);
    }
}
