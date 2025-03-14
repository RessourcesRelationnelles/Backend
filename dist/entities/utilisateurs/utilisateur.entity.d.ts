import { Ressource } from '../ressources/ressource.entity';
import { Commentaire } from '../commentaires/commentaire.entity';
import { Favori } from '../favoris/favori.entity';
export declare enum Role {
    CITOYEN = "citoyen",
    MODERATEUR = "mod\u00E9rateur",
    ADMINISTRATEUR = "administrateur",
    SUPER_ADMINISTRATEUR = "super-administrateur"
}
export declare class Utilisateur {
    id: number;
    nom: string;
    email: string;
    mot_de_passe: string;
    role: Role;
    dateCreation: Date;
    ressources: Ressource[];
    commentaires: Commentaire[];
    favoris: Favori[];
}
