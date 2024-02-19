import {Component, OnInit} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../service/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    moduleId: module.id,
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class LoginComponent implements OnInit{
    store: any;

    formLogin! : FormGroup;
    constructor(public translate: TranslateService, public storeData: Store<any>, public router: Router, private appSetting: AppService,private fb: FormBuilder, private authService : AuthService) {
        this.initStore();
    }

    ngOnInit(): void {
        this.formLogin = this.fb.group({
            username: this.fb.control(""),
            password: this.fb.control("")

        })
    }
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    changeLanguage(item: any) {
        this.translate.use(item.code);
        this.appSetting.toggleLanguage(item);
        if (this.store.locale?.toLowerCase() === 'ae') {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'rtl' });
        } else {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'ltr' });
        }
        window.location.reload();
    }

    handleLogin() {
        let username = this.formLogin.value.username;
        let password = this.formLogin.value.password;
        this.authService.login(username,password).subscribe({
            next: data =>{
                console.log('data'+data);
                this.authService.loadHome(data);
                this.router.navigateByUrl("/home");
            },
            error : err =>{
                console.log(err);
                this.router.navigateByUrl("/login");

            }
        })

    }
}
