import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Activity, StatusActivity } from 'src/app/models/task';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivityDialogComponent, ActivityDialogResult } from '../activity-dialog/activity-dialog.component';
import { BehaviorSubject } from 'rxjs';

const getObservable = (collection: AngularFirestoreCollection<Activity>) => {
  const subject = new BehaviorSubject<Activity[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Activity[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.component.html',
  styleUrls: ['./list-activities.component.css']
})

export class ListActivitiesComponent implements OnInit {

  user! : User;

  todo = getObservable(this.store.collection('todo'));
  inProgress = getObservable(this.store.collection('inProgress'));
  done = getObservable(this.store.collection('done'));

  constructor(
    public authService: AuthService,
    private taskApi: TaskService,
    public fb: FormBuilder,
    private dialog: MatDialog, 
    private store: AngularFirestore
  ) { 
    
    authService.afAuth.authState.subscribe( authState => {
      console.log(authState);
      this.user = {
        uid : authState?.uid || '',
        displayName : authState?.displayName || '',
        email : authState?.email || '',
        photoURL : '',
        emailVerified : true
      }

      //this.user.id = authState;
    });
    
  }

  ngOnInit(): void {
  
  }

  signOut():void{
    this.authService.SignOut();
  }

  public get statusActivity(): typeof StatusActivity {
    return StatusActivity; 
  }

  drop(event: CdkDragDrop<Activity[]|null>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.previousContainer.data || !event.container.data) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }


  newTask(): void {
    const dialogRef = this.dialog.open(ActivityDialogComponent, {
      width: '320px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: ActivityDialogResult) => {
        if (!result) {
          return;
        }
        console.log(result.task);
        this.store.collection('todo').add(result.task);
      });
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Activity): void {
    const dialogRef = this.dialog.open(ActivityDialogComponent, {
      width: '320px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: ActivityDialogResult) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        this.store.collection(list).doc(task.id).delete();
      } else {
        this.store.collection(list).doc(task.id).update(task);
      }
    });
  }


}
