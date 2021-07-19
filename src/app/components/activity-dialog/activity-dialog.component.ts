import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Activity } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-activity-dialog',
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.css']
})
export class ActivityDialogComponent implements OnInit {

  private backupTask: Partial<Activity> = { ...this.data.task };
  users : User[];

  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<ActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActivityDialogData
  ) {
    this.users = [];
   }
  ngOnInit(): void {
    this.authService.GetUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe((data : any) => {
      this.users = data;
      this.users.map((item:User) => {
        if(item.displayName) {
          item.initials = (item.displayName.split(' ').length > 1) ? item.displayName.split(' ')[0].charAt(0) + item.displayName.split(' ')[1].charAt(0) : item.displayName.split(' ')[0].charAt(0);
        }else{
          item.initials = item.email.charAt(0)
        }
        
        return item;
      })
    });
  }

  cancel(): void {
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.data.task.user = this.backupTask.user;
    this.dialogRef.close(this.data);
  }

}

export interface ActivityDialogData {
  task: Partial<Activity>;
  enableDelete: boolean;
}

export interface ActivityDialogResult {
  task: Activity;
  delete?: boolean;
}
