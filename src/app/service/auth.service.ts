import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    isAuthenticated: boolean = false;
    roles : any;
    username : any;
    userId : any;
    accessToken! : any;

  constructor(private http: HttpClient, private router: Router,private location: Location) { }

    public login(username: string, password: string){
        let options = {
            headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
        }
        let params=new HttpParams()
            .set("username", username).set("password",password);
        return this.http.post("http://localhost:3000/auth/login", params, options)
    }

    loadHome(data: any) {
      this.isAuthenticated = true;
        this.accessToken = data['token'];
        let decodeJwt = jwtDecode(this.accessToken);
        this.username = decodeJwt.sub;
        this.roles = decodeJwt.aud ;
        this.userId = decodeJwt.jti ;
        console.log(this.userId)
        window.localStorage.setItem("JWT_TOKEN",this.accessToken);
    }

    logout() {
      this.isAuthenticated=false;
      this.accessToken = undefined;
      this.username = undefined;
      this.roles = undefined;
      this.userId = undefined;
      window.localStorage.removeItem("JWT_TOKEN");
        this.router.navigateByUrl('/login');
    }

    loadTokenFromLocalStorige() {
       let token =  window.localStorage.getItem("JWT_TOKEN");
       this.loadHome({"token":token});
        const currentUrl = this.location.path();
       this.router.navigateByUrl(currentUrl);
    }
}
