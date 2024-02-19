import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tache} from "../models/tache.model";
import {User} from "../models/user.model";
import {UserTache} from "../models/tasksUser.model";

@Injectable({
  providedIn: 'root'
})
export class TacheService {
    private baseUrl ="http://localhost:3000/gestion_taches";
        constructor(private http: HttpClient) { }

    getTaches():Observable<Tache[]>{
      return this.http.get<Tache[]>("http://localhost:3000/taches");
    }

    getUserTaches(id : string):Observable<UserTache>{
        const url = `${this.baseUrl}/users/taches/${id}`;
        return this.http.get<UserTache>(url);
    }
    addTache(tache: Tache):Observable<Tache>{
      return  this.http.post<Tache>("http://localhost:3000/gestion_taches/taches/create",tache);
    }

    updateState(id: string, newState: string): Observable<any> {
        const url = `${this.baseUrl}/taches/${id}/state`;
        const body = { state: newState };
        return this.http.patch(url, body);
    }

    deleteTask(tache:Tache):Observable<void>{
        return this.http.delete<void>("http://localhost:3000/gestion_taches/taches/"+tache._id);
    }
}
