"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favori = void 0;
const typeorm_1 = require("typeorm");
const ressource_entity_1 = require("../ressources/ressource.entity");
const utilisateur_entity_1 = require("../utilisateurs/utilisateur.entity");
let Favori = class Favori {
    id;
    utilisateur;
    ressource;
    dateAjout;
};
exports.Favori = Favori;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Favori.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (utilisateur) => utilisateur.favoris, { onDelete: 'CASCADE' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], Favori.prototype, "utilisateur", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ressource_entity_1.Ressource, { onDelete: 'CASCADE' }),
    __metadata("design:type", ressource_entity_1.Ressource)
], Favori.prototype, "ressource", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'date_ajout' }),
    __metadata("design:type", Date)
], Favori.prototype, "dateAjout", void 0);
exports.Favori = Favori = __decorate([
    (0, typeorm_1.Entity)('Favoris')
], Favori);
//# sourceMappingURL=favori.entity.js.map