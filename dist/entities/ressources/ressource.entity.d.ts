import { Categorie } from '../categories/categorie.entity';
import { Utilisateur } from '../utilisateurs/utilisateur.entity';
export declare enum Statut {
    PRIVE = "priv\u00E9",
    PARTAGE = "partag\u00E9",
    PUBLIC = "public"
}
export declare class Ressource {
    id: number;
    titre: string;
    description: string;
    categorie: Categorie;
    utilisateur: Utilisateur;
    statut: Statut;
    dateCreation: Date;
}
