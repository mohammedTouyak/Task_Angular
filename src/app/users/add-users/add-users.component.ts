import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {UserService} from "../../service/user.service";
import {Observable, of, startWith,catchError, map} from "rxjs";
import {AppDataState , DataStateEnum} from "../../state/user.state";
import {User, UserDetails} from "../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
    moduleId: module.id,
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class AddUsersComponent implements OnInit{
    codeArr: any = [];
    users$: Observable<AppDataState<UserDetails>> | null =null ;
    readonly  DataStateEnum = DataStateEnum;


    toggleCode = (name: string) => {
        if (this.codeArr.includes(name)) {
            this.codeArr = this.codeArr.filter((d: string) => d != name);
        } else {
            this.codeArr.push(name);
        }
    };

    tableData = [
        {
            _id: "65ca8b73f2536a50d4d94fd4",
            username:"itsco",
            displayName:"adil",
            role:"developper",
        },
        {
            _id: "65ca8b73f2536a50d4d94fd4",
            username:"itsco",
            displayName:"adil",
            role:"developper",
        },

    ];
    inputValue: any;
    constructor(private userService: UserService , private router: Router) {}

    ngOnInit(): void {
      this.OnGetAllUsers();
    }



    OnGetAllUsers(){
        this.users$ = this.userService.getAllUsers().pipe(
            map(data => ({ dataState : DataStateEnum.LOADED , data : data})),
            startWith({dataState : DataStateEnum.LOADING}),
            catchError(err => of({ dataState : DataStateEnum.ERROR , errorMessage : err.message}))
        )

    }
    onSearch(dataForm: any) {
        this.users$ = this.userService.searchUser(dataForm.keyword).pipe(
            map(data => ({ dataState : DataStateEnum.LOADED , data : data})),
            startWith({dataState : DataStateEnum.LOADING}),
            catchError(err => of({ dataState : DataStateEnum.ERROR , errorMessage : err.message}))
        )
    }
    onDelete(u: User) {
        let v = confirm("vous-etes sur")
        if(v == true)
            this.userService.deleteUser(u).subscribe(
                data=>{
                    this.OnGetAllUsers();
                }
            )
    }

    GoToPage(dataForm: any ,page: number) {
        this.users$ = this.userService.searchUser(dataForm.keyword , page).pipe(
            map(data => ({ dataState : DataStateEnum.LOADED , data : data})),
            startWith({dataState : DataStateEnum.LOADING}),
            catchError(err => of({ dataState : DataStateEnum.ERROR , errorMessage : err.message}))
        )

    }

    onNewUser() {
        this.router.navigateByUrl("home/users/new_user");
    }
}
