import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.component.html',
  styleUrls: ['./list-activities.component.css']
})
export class ListActivitiesComponent implements OnInit {

  user : User | undefined;

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  inProgress:string[] = []

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  constructor(public authService: AuthService) { 
    this.user = authService.userData;
  }

  ngOnInit(): void {
  }

  signOut():void{
    this.authService.SignOut();
  }

  // dropped(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //    moveItemInArray(
  //      event.container.data, 
  //       event.previousIndex, 
  //       event.currentIndex
  //    );
  //   } else {
  //     transferArrayItem(
  //      event.previousContainer.data,
  //      event.container.data,
  //      event.previousIndex,
  //      event.currentIndex
  //    );
  //  }
  // }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
