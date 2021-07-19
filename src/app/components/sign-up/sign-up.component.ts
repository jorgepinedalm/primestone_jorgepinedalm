import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email: string | undefined;
  password :string | undefined;
  displayName :string | undefined;

  constructor(public authService: AuthService) {
   }

  ngOnInit(): void {
  }

  submit(form:NgForm){
    if(form.valid){
      this.authService.SignUp(form.value.email, form.value.password, form.value.displayName);
    }
    
  }

}
