import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user : User = { email : undefined, password : undefined };
  constructor(public authService: AuthService) { 

  }

  ngOnInit(): void {
  }

  submit(form:any){
    this.authService.SignIn(form.email, form.password)
  }

}
