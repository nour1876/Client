import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountModule } from '../account.module';
import { AccountService } from '../account.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.createLoginForm()
  }
  createLoginForm(){
    this.loginForm= new FormGroup({
      email:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    });
  }
  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe(()=>{
      console.log('user logged in');
    },error=>{
      console.log(error);
    })
  }

}
