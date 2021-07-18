import { Activity } from "./activity";

export class User {
    firstname? : string;
    lastname? : string;
    email? : string;
    password? : string;
    activities? : Activity[];

    constructor(){
        this.activities = [];
    }
}