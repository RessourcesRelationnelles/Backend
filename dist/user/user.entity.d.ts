export declare enum Role {
    CITOYEN = "citoyen",
    MODERATEUR = "mod\u00E9rateur",
    ADMINISTRATEUR = "administrateur",
    SUPER_ADMINISTRATEUR = "super-administrateur"
}
export declare class User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    mot_de_passe: string;
    role: Role;
    dateCreation: Date;
}
