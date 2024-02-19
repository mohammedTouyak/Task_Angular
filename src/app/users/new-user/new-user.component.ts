import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit{
    codeArr: any = [];
    toggleCode = (name: string) => {
        if (this.codeArr.includes(name)) {
            this.codeArr = this.codeArr.filter((d: string) => d != name);
        } else {
            this.codeArr.push(name);
        }
    };

    userFormgroup!: FormGroup;
    constructor(private fb: FormBuilder,private userService: UserService) {
    }

    ngOnInit(): void {
        this.userFormgroup = this.fb.group({
            username:["", Validators.required],
            role:["", Validators.required],
            displayName:["", Validators.required],

        })
    }

    onSaveUser() {
        console.log(this.userFormgroup.value)
        this.userService.saveUsers(this.userFormgroup.value).subscribe(data=>{
            alert('saved user');
        });
    }
}
