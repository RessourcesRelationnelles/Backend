import { Ressource } from '../ressources/ressource.entity';
import { Utilisateur } from '../utilisateurs/utilisateur.entity';
export declare class Favori {
    id: number;
    utilisateur: Utilisateur;
    ressource: Ressource;
    dateAjout: Date;
}
