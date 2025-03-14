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
exports.Ressource = exports.Statut = void 0;
const typeorm_1 = require("typeorm");
const categorie_entity_1 = require("../categories/categorie.entity");
const utilisateur_entity_1 = require("../utilisateurs/utilisateur.entity");
var Statut;
(function (Statut) {
    Statut["PRIVE"] = "priv\u00E9";
    Statut["PARTAGE"] = "partag\u00E9";
    Statut["PUBLIC"] = "public";
})(Statut || (exports.Statut = Statut = {}));
let Ressource = class Ressource {
    id;
    titre;
    description;
    categorie;
    utilisateur;
    statut;
    dateCreation;
};
exports.Ressource = Ressource;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Ressource.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Ressource.prototype, "titre", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Ressource.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categorie_entity_1.Categorie, (categorie) => categorie.ressources, { nullable: true, onDelete: 'SET NULL' }),
    __metadata("design:type", categorie_entity_1.Categorie)
], Ressource.prototype, "categorie", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => utilisateur_entity_1.Utilisateur, (utilisateur) => utilisateur.ressources, { nullable: true, onDelete: 'SET NULL' }),
    __metadata("design:type", utilisateur_entity_1.Utilisateur)
], Ressource.prototype, "utilisateur", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Statut, default: Statut.PUBLIC }),
    __metadata("design:type", String)
], Ressource.prototype, "statut", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'date_creation' }),
    __metadata("design:type", Date)
], Ressource.prototype, "dateCreation", void 0);
exports.Ressource = Ressource = __decorate([
    (0, typeorm_1.Entity)('Ressources')
], Ressource);
//# sourceMappingURL=ressource.entity.js.map