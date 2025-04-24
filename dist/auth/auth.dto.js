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
exports.AuthLoginDto = exports.AuthRegisterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../user/user.entity");
class AuthRegisterDto {
    email;
    mot_de_passe;
    nom;
    prenom;
    role;
}
exports.AuthRegisterDto = AuthRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "mot_de_passe", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "prenom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_entity_1.Role, required: false }),
    __metadata("design:type", String)
], AuthRegisterDto.prototype, "role", void 0);
class AuthLoginDto {
    email;
    mot_de_passe;
}
exports.AuthLoginDto = AuthLoginDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AuthLoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AuthLoginDto.prototype, "mot_de_passe", void 0);
//# sourceMappingURL=auth.dto.js.map