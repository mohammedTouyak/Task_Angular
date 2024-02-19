import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';



// headlessui
import { MenuModule } from 'headlessui-angular';
import {LoginComponent} from "./login.component";
import {ProfileComponent} from "../users/profile";

const routes: Routes = [
    // { path: 'users/auth/login', component: LoginComponent, title: 'User Profile | VRISTO - Multipurpose Tailwind Dashboard Template' },

];
@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, MenuModule],
    declarations: [

    ],
})
export class AuthModule {}
