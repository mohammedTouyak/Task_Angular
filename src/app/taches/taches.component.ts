
import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalComponent } from 'angular-custom-modal';
import swal from "sweetalert2";
import {TacheService} from "../service/tache.service";

import {catchError, map, Observable, of, startWith} from "rxjs";
import {AppDataState, DataStateEnum} from "../state/user.state";
import {User, UserDetails} from "../models/user.model";
import {Tache} from "../models/tache.model";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-taches',
    templateUrl: './taches.component.html',
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class TachesComponent implements OnInit{
    readonly  DataStateEnum = DataStateEnum;
    state: string = 'new';

    constructor(private tacheService: TacheService,private route: Router, public autheService : AuthService,public storeData: Store<any>) {}

    ngOnInit(): void {
        if(this.autheService.roles.includes('admin')){
            this.OnGetAllTache();
        }else{
            this.OnGetUserTasks();
        }

    }


    paramsTask = {
        projectId: null,
        id: null,
        title: '',
        description: '',
        tags: '',


    };
    selectedTask: any = null;
    @ViewChild('isAddProjectModal') isAddProjectModal!: ModalComponent;
    @ViewChild('isAddTaskModal') isAddTaskModal!: ModalComponent;
    @ViewChild('isDeleteModal') isDeleteModal!: ModalComponent;


    projectList$: Tache[] | undefined ;
    filterBy: string = 'new' ;

    OnGetAllTache(){
        this.tacheService.getTaches().subscribe( data =>{
               this.projectList$ = data ;
           });

    }

    OnGetUserTasks(){
        this.tacheService.getUserTaches(this.autheService.userId).subscribe(data =>{
            this.projectList$ = data.tache ;
        })
    }

    clearProjects(project: any) {
        project.tasks = [];
    }

    // task
    isButtonDisabled: boolean = false;
    addEditTask(projectId: any, task: any = null) {
        this.paramsTask = {
            projectId: null,
            id: null,
            title: '',
            description: '',
            tags: '',
        };
        if (task) {
            this.paramsTask = JSON.parse(JSON.stringify(task));
            this.paramsTask.tags = this.paramsTask.tags ? this.paramsTask.tags.toString() : '';
        }
        this.paramsTask.projectId = projectId;
        this.isAddTaskModal.open();
    }



    deleteConfirmModal(projectId: any, task: any = null) {
        this.selectedTask = task;
        setTimeout(() => {
            this.isDeleteModal.open();
        }, 10);
    }



    showMessage(msg = '', type = 'success') {
        const toast: any = (Swal as any).mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    }

    OnSaveTache() {
        this.route.navigateByUrl("home/tache/add_tache");
    }
    selectedButtonId: any = null;
    onChangeState(_id: string , state : string) {
        let newState = state;
        if(state === 'new' ){
            newState = 'In Progress' ;
            this.state = newState;
        }
        if(state === 'In Progress'){
            let v = confirm("are you sur task is completed ?")
            if(v == true){
                newState = 'Completed';
                this.state = newState;
                this.isButtonDisabled = true ;
            }

        }
        this.tacheService.updateState(_id,newState).subscribe(data =>{
            this.ngOnInit()
        })

    }

    onDelete(t: Tache) {
        let v = confirm("are you sur ? ")
        if(v == true)
            this.tacheService.deleteTask(t).subscribe(
                data=>{
                    this.ngOnInit();
                }
            )
    }

    filterTasks(state: string) {
        this.filterBy = state;
    }
}
