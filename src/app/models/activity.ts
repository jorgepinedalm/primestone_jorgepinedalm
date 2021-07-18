import { User } from "./user";

export class Activity {
    title? : string;
    description? : string;
    status? : StatusActivity;
    created_user? : User;
}

export enum StatusActivity {
    Nueva = 1,
    EnProgreso,
    Terminada
}