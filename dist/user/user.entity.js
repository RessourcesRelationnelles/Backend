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
exports.User = exports.Role = void 0;
const typeorm_1 = require("typeorm");
var Role;
(function (Role) {
    Role["CITOYEN"] = "citoyen";
    Role["MODERATEUR"] = "mod\u00E9rateur";
    Role["ADMINISTRATEUR"] = "administrateur";
    Role["SUPER_ADMINISTRATEUR"] = "super-administrateur";
})(Role || (exports.Role = Role = {}));
let User = class User {
    id;
    nom;
    prenom;
    email;
    mot_de_passe;
    role;
    dateCreation;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], User.prototype, "nom", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], User.prototype, "prenom", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "mot_de_passe", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Role }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'date_creation' }),
    __metadata("design:type", Date)
], User.prototype, "dateCreation", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('Utilisateurs')
], User);
//# sourceMappingURL=user.entity.js.map