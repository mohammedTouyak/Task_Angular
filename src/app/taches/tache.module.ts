import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



// headlessui
import { MenuModule } from 'headlessui-angular';

// perfect-scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';
import {TachesComponent} from "./taches.component";
import {ModalModule} from "angular-custom-modal";
import { AddTacheComponent } from './add-tache/add-tache.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {AuthorizationGuard} from "../guards/authorization.guard";




const routes: Routes = [
    { path: 'scrumboard', component: TachesComponent, title: 'Calendar | VRISTO - Multipurpose Tailwind Dashboard Template' },
    { path: 'add_tache', component: AddTacheComponent ,canActivate: [AuthorizationGuard] , data: {role : 'admin'}, title: 'Calendar | VRISTO - Multipurpose Tailwind Dashboard Template' },


];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MenuModule,
        NgScrollbarModule.withConfig({
            visibility: 'hover',
            appearance: 'standard',
        }),
        ModalModule,
        NgSelectModule,

    ],
    declarations: [
      TachesComponent,
      AddTacheComponent
    ],
})


export class TacheModule {}
