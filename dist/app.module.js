"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const utilisateur_entity_1 = require("./entities/utilisateurs/utilisateur.entity");
const categorie_entity_1 = require("./entities/categories/categorie.entity");
const ressource_entity_1 = require("./entities/ressources/ressource.entity");
const commentaire_entity_1 = require("./entities/commentaires/commentaire.entity");
const favori_entity_1 = require("./entities/favoris/favori.entity");
const statistique_entity_1 = require("./entities/statistiques/statistique.entity");
const utilisateur_module_1 = require("./modules/utilisateur.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                entities: [utilisateur_entity_1.Utilisateur, categorie_entity_1.Categorie, ressource_entity_1.Ressource, commentaire_entity_1.Commentaire, favori_entity_1.Favori, statistique_entity_1.Statistique],
                synchronize: true,
                autoLoadEntities: true
            }),
            utilisateur_module_1.UsersModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map