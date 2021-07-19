import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Activity, StatusActivity } from 'src/app/models/task';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.component.html',
  styleUrls: ['./list-activities.component.css']
})



export class ListActivitiesComponent implements OnInit {

  user! : User;
 
  taskForm: FormGroup;

  statusArray:string[] = [StatusActivity.Nueva, StatusActivity.EnProgreso, StatusActivity.Terminada]

  users : User[] = [];

  todo: Activity[] = [];

  inProgress:Activity[] = []

  done:Activity[] = [];

  constructor(
    public authService: AuthService,
    private taskApi: TaskService,
    public fb: FormBuilder) { 
    this.user = authService.userData;
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: [null, [Validators.required]],
      uid_user: authService.userData,
      user : [this.users, [Validators.required]]
    })
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
    this.taskApi.GetTaskList().snapshotChanges().subscribe(tasks => {
      this.todo = []; this.inProgress = []; this.done = [];
      tasks.forEach(item => {
        let a:any = item.payload.toJSON();
        a['$key'] = item.key;
        
        switch (a.status) {
          case "Nueva":
            this.todo.push(a as Activity);
            break;
          case "En Progreso":
            this.inProgress.push(a as Activity);
            break;
          case "Terminada":
            this.done.push(a as Activity);
            break;
        
          default:
            break;
        }
        //this.TaskData.push(a as Activity)
      })
      console.log(tasks);
  })
  }

  signOut():void{
    this.authService.SignOut();
  }

  public get statusActivity(): typeof StatusActivity {
    return StatusActivity; 
  }

  drop(event: CdkDragDrop<Activity[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
        console.log(event);
    }
  }

  openAddTaskModal(){
    this.resetForm();
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.taskForm.controls[controlName].hasError(errorName);
  }

  submitTask() {
    if (this.taskForm.valid){
      this.taskApi.addTask(this.taskForm.value)
      this.resetForm();
    }
  }

  resetForm() {
    this.taskForm.reset();
    Object.keys(this.taskForm.controls).forEach(key => {
      this.taskForm.controls[key].setErrors(null)
    });
  }

}
