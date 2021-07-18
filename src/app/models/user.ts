import { Activity } from "./activity";

export interface User {
    uid?: string;
    firstname? : string;
    lastname? : string;
    email? : string;
    password? : string;
    activities? : Activity[];

}