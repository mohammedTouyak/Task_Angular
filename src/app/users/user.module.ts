import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UserAccountSettingsComponent } from './user-account-settings';
import { ProfileComponent } from './profile';
import { AddUsersComponent } from './add-users/add-users.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewUserComponent } from './new-user/new-user.component';
import {TachesComponent} from "../taches/taches.component";
import {AuthorizationGuard} from "../guards/authorization.guard";

const routes: Routes = [
    {
        path: 'user-account-settings',
        component: UserAccountSettingsComponent,
        title: 'Account Setting | VRISTO - Multipurpose Tailwind Dashboard Template',
    },
    { path: 'profile', component: ProfileComponent, title: 'User Profile | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'add_user', component: AddUsersComponent, title: 'User Profile | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'new_user', component: NewUserComponent,canActivate: [AuthorizationGuard] , data: {role : 'admin'} ,title: 'User Profile | VRISTO - Multipurpose Tailwind Dashboard Template' },


];
@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [UserAccountSettingsComponent, ProfileComponent, AddUsersComponent, NewUserComponent],
})
export class UsersModule {}
