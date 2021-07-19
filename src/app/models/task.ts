import { User } from "./user";

export interface Activity {
    id:string;
    uid?: string;
    title? : string;
    description? : string;
    status? : StatusActivity;
    uid_user? : string;
    user? : User;
}

export enum StatusActivity {
    Nueva = 'Nueva',
    EnProgreso = 'En Progreso',
    Terminada = 'Terminada'
}

