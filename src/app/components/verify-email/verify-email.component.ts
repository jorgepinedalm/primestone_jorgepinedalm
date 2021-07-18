import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  user : User | undefined;

  constructor(public authService: AuthService) {
    this.user = authService.userData;

   }

  sendConfirmationEmail():void{
    this.authService.SendVerificationMail();
  }

  ngOnInit(): void {
  }

}
