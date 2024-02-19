import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TacheService} from "../../service/tache.service";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.css']
})
export class AddTacheComponent implements OnInit{
    codeArr: any = [];
    toggleCode = (name: string) => {
        if (this.codeArr.includes(name)) {
            this.codeArr = this.codeArr.filter((d: string) => d != name);
        } else {
            this.codeArr.push(name);
        }
    };

    options = [
        {_id :"65ca8b73f2536a50d4d94fd4" , username: "itsco"},
        {_id :"65cb61317c5a898746315fd9" , username: "gholam"},
        {_id :"65cb63487c5a898746315ff5" , username: "moucho"},
        {_id :"65cb633a7c5a898746315ff3" , username: "boudra"},


    ];
    input1 = 'Orange';
    userFormgroup!: FormGroup;
    constructor(private fb: FormBuilder,private tacheService: TacheService,private route: Router) {
    }

    ngOnInit(): void {
        this.userFormgroup = this.fb.group({
            name:["", Validators.required],
            state:["", Validators.required],
            description:["", Validators.required],
            username:["",Validators.required],

        })
    }

    onSaveUser() {
        console.log(this.userFormgroup.value)
            this.tacheService.addTache(this.userFormgroup.value).subscribe(data=>{
                this.route.navigateByUrl("/home/tache/scrumboard")
                alert('saved task');
            });
    }
}
