# 🐱‍🏍 Backend – Ressources Relationnelles

API REST construite avec **NestJS**, connectée à une base de données **MySQL**, sécurisée avec **JWT**, documentée avec **Swagger**, et entièrement dockerisée 🚀

---

## 🚀 Technologies

- [NestJS](https://nestjs.com/) – Framework Node.js
- [TypeORM](https://typeorm.io/) – ORM pour base MySQL
- [MySQL 8](https://www.mysql.com/)
- [JWT](https://jwt.io/) – Authentification par token
- [Docker](https://www.docker.com/)
- Swagger (auto-généré)

---

## 📦 Prérequis

- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- (Facultatif) [Node.js >= 18](https://nodejs.org/) si tu veux lancer hors Docker

---

## ⚙️ Lancer le projet avec Docker

```bash
# Cloner le projet
git clone https://github.com/ton-utilisateur/ressources-backend.git
cd ressources-backend

# Lancer les conteneurs (API + MySQL)
docker-compose up --build
