import {Tache} from "./tache.model";

export interface UserTache{

    username: string;

    role: string;

    tache?: Tache[];


}
