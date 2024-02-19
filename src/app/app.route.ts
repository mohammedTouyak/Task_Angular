import { Routes } from '@angular/router';

// dashboard
import { IndexComponent } from './index';
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';
import {TachesComponent} from "./taches/taches.component";
import {LoginComponent} from "./login/login.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";

export const routes: Routes = [
    {
        path: 'home',
        component: AppLayout,
        canActivate:[AuthenticationGuard],
        children: [
            // dashboard
            { path: '', component: IndexComponent, title: 'Sales Admin | VRISTO - Multipurpose Tailwind Dashboard Template' },
            { path: 'users', loadChildren: () => import('./users/user.module').then((d) => d.UsersModule) },
            { path: 'tache', loadChildren: () => import('./taches/tache.module').then((d) => d.TacheModule) },

        ],
    },


    {
        path: 'login',
        component: LoginComponent,
        children: [
        ],
    },
    {path : '' , redirectTo: '/login' , pathMatch: 'full'},
    {path : 'notAuthorized' , component: NotAuthorizedComponent},

];
