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
exports.Commentaire = void 0;
const typeorm_1 = require("typeorm");
const ressource_entity_1 = require("../ressources/ressource.entity");
const utilisateur_entity_1 = require("../utilisateurs/utilisateur.entity");
let Commentaire = class Commentaire {
    id;
    ressource;
    utilisateur;
    contenu;
    dateCreation;
};
exports.Commentaire = Commentaire;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Commentaire.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ressource_entity_1.Ressource, (ressource) => ressource.id, { onDelete: 'CASCADE' }),
    __metadata("design:type", ressource_entity_1.Ressource)
], Commentaire.prototype, "ressource", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (utilisateur) => utilisateur.commentaires, { onDelete: 'CASCADE' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], Commentaire.prototype, "utilisateur", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Commentaire.prototype, "contenu", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'date_creation' }),
    __metadata("design:type", Date)
], Commentaire.prototype, "dateCreation", void 0);
exports.Commentaire = Commentaire = __decorate([
    (0, typeorm_1.Entity)('Commentaires')
], Commentaire);
//# sourceMappingURL=commentaire.entity.js.map