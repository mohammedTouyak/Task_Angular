import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User, UserDetails} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

    getAllUsers():Observable<UserDetails>{

        return this.http.get<UserDetails>("http://localhost:3000/users");
    }
    deleteUser(user:User):Observable<void>{
        return this.http.delete<void>("http://localhost:3000/users/"+user._id);
    }
    saveUsers(user: User):Observable<User>{
      console.log("user:"+user)
        return this.http.post<User>("http://localhost:3000/users",user);
    }
    searchUser(keyword:string , page?: number):Observable<UserDetails>{
        let uri : string = "";
        if(keyword) uri = "http://localhost:3000/users/search?s="+keyword ;
        else uri = "http://localhost:3000/users/search?page="+page;
        return this.http.get<UserDetails>(uri);
    }
}
