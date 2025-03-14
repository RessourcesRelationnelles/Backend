import { Ressource } from '../ressources/ressource.entity';
import { Utilisateur } from '../utilisateurs/utilisateur.entity';
export declare class Commentaire {
    id: number;
    ressource: Ressource;
    utilisateur: Utilisateur;
    contenu: string;
    dateCreation: Date;
}
