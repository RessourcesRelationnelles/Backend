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
exports.Utilisateur = exports.Role = void 0;
const typeorm_1 = require("typeorm");
const ressource_entity_1 = require("../ressources/ressource.entity");
const commentaire_entity_1 = require("../commentaires/commentaire.entity");
const favori_entity_1 = require("../favoris/favori.entity");
var Role;
(function (Role) {
    Role["CITOYEN"] = "citoyen";
    Role["MODERATEUR"] = "mod\u00E9rateur";
    Role["ADMINISTRATEUR"] = "administrateur";
    Role["SUPER_ADMINISTRATEUR"] = "super-administrateur";
})(Role || (exports.Role = Role = {}));
let Utilisateur = class Utilisateur {
    id;
    nom;
    prenom;
    email;
    mot_de_passe;
    role;
    dateCreation;
    ressources;
    commentaires;
    favoris;
};
exports.Utilisateur = Utilisateur;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Utilisateur.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Utilisateur.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Utilisateur.prototype, "prenom", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], Utilisateur.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Utilisateur.prototype, "mot_de_passe", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Role }),
    __metadata("design:type", String)
], Utilisateur.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'date_creation' }),
    __metadata("design:type", Date)
], Utilisateur.prototype, "dateCreation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ressource_entity_1.Ressource, (ressource) => ressource.utilisateur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "ressources", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => commentaire_entity_1.Commentaire, (commentaire) => commentaire.utilisateur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "commentaires", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => favori_entity_1.Favori, (favori) => favori.utilisateur),
    __metadata("design:type", Array)
], Utilisateur.prototype, "favoris", void 0);
exports.Utilisateur = Utilisateur = __decorate([
    (0, typeorm_1.Entity)('Utilisateurs')
], Utilisateur);
//# sourceMappingURL=utilisateur.entity.js.map