import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.component.html',
  styleUrls: ['./list-activities.component.css']
})
export class ListActivitiesComponent implements OnInit {

  user : User | undefined;

  constructor(public authService: AuthService) { 
    this.user = authService.userData;
  }

  ngOnInit(): void {
  }

  signOut():void{
    this.authService.SignOut();
  }

}
