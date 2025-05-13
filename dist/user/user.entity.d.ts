export declare enum Role {
    CITOYEN = "citoyen",
    MODERATEUR = "mod\u00E9rateur",
    ADMINISTRATEUR = "administrateur",
    SUPER_ADMINISTRATEUR = "super-administrateur"
}
export declare class User {
    id: string;
    pseudo: string;
    bio: string;
    photoDeProfil: string;
    name: string;
    firstName: string;
    email: string;
    password: string;
    role: Role;
    dateCreation: Date;
}
