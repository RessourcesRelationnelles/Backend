import { Ressource } from '../ressources/ressource.entity';
export declare class Statistique {
    id: number;
    ressource: Ressource;
    consultations: number;
    partages: number;
    dateMaj: Date;
}
