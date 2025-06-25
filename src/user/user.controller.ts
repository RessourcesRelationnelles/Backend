import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, NotFoundException, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UserUpdateDto, UserAdminCreateDto } from './user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from './user.entity';

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
    async getProfile(@Req() req) {
        const userId = req.user.id;
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new NotFoundException('Utilisateur non trouvé');
        }
        return user;
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
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('me')
    @ApiOperation({ summary: 'Mettre à jour les infos de mon compte' })
    async update(@Req() req, @Body() body: UserUpdateDto) {
    const userId = req.user.id;
    if ('role' in body) {
        delete body.role;
    }
    const updatedUser = await this.userService.update(userId, body);

    if (!updatedUser) {
        throw new NotFoundException("Impossible de mettre à jour l'utilisateur");
    }

    return updatedUser;
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('email/:email')
    @ApiOperation({ summary: 'Supprimer un utilisateur avec son email' })
    async removeByEmail(@Req() req, @Param('email') email: string) {
        const userId = req.user.id;
        const user = await this.userService.findById(userId);
        if (!user || (user.role !== 'administrateur' && user.role !== 'super-administrateur')) {
            throw new NotFoundException('Accès refusé : rôle insuffisant');
        }
        return this.userService.remove(email);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('me')
    @ApiOperation({ summary: 'Supprimer son propre compte' })
    async deleteMe(@Req() req) {
        const userId = req.user.id;

        const user = await this.userService.findById(userId);
        if (!user) {
            throw new NotFoundException('Utilisateur non trouvé');
        }

        return this.userService.removeById(userId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch(':id/toggle')
    @ApiOperation({ summary: 'Activer ou désactiver un compte utilisateur (toggle)' })
    async toggleActiveStatus(@Req() req, @Param('id') id: string) {
        const user = await this.userService.findById(req.user.id);
        if (!user || (user.role !== Role.ADMINISTRATEUR && user.role !== Role.SUPER_ADMINISTRATEUR)) {
            throw new ForbiddenException('Accès refusé : rôle insuffisant');
        }
        if (req.user.id === id) {
            throw new ForbiddenException('Vous ne pouvez pas désactiver ou activer votre propre compte.');
        }
        const targetUser = await this.userService.findById(id);
        if (!targetUser) {
            throw new NotFoundException('Utilisateur cible non trouvé');
        }
        return this.userService.setActiveStatus(id, !targetUser.is_active);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('admin')
    @ApiOperation({ summary: 'Créer un compte modérateur/administrateur/super-administrateur (super-admin seulement)' })
    async createAdmin(@Req() req, @Body() body: UserAdminCreateDto) {
        const user = await this.userService.findById(req.user.id);
        if (!user || user.role !== Role.SUPER_ADMINISTRATEUR) {
            throw new ForbiddenException('Accès refusé : super-administrateur requis');
        }
        if (![Role.MODERATEUR, Role.ADMINISTRATEUR, Role.SUPER_ADMINISTRATEUR].includes(body.role)) {
            throw new ForbiddenException('Rôle non autorisé');
        }
        return this.userService.createAdmin(body);
    }

}
