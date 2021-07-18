import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.component.html',
  styleUrls: ['./list-activities.component.css']
})
export class ListActivitiesComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  signOut():void{
    this.authService.SignOut();
  }

}
