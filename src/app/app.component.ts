import {Component, OnInit} from '@angular/core';
import {AuthService} from "./service/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
    constructor(private authService: AuthService) {}
    ngOnInit() {
        this.authService.loadTokenFromLocalStorige();
    }
}
