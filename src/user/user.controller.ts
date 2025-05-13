import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, NotFoundException, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UserUpdateDto } from './user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Req() req) {
        return req.user; 
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
    
    @UseGuards(JwtAuthGuard)
    @Put('me')
    @ApiOperation({ summary: 'Mettre à jour les infos de mon compte' })
    async updateMe(@Req() req, @Body() body: UserUpdateDto) {
    const userId = req.user.sub; // <-- JWT contient le user ID
    const updatedUser = await this.userService.update(userId, body);

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
