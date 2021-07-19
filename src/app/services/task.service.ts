import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Activity } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasksRef!: AngularFireList<any>;
  taskRef!: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  GetTaskList() {
    this.tasksRef = this.db.list('tasks-list');
    return this.tasksRef;
  }

  addTask(task : Activity){
    this.tasksRef.push({
      title: task.title,
      description: task.description,
      status: task.status,
      uid_user: task.uid_user,
      user : task.user
    })
    .catch(error => {
      console.log(error);
    })
  }

  UpdateTask(task: Activity) {
    this.taskRef.update({
      title: task.title,
      description: task.description,
      author_name: task.status,
    })
    .catch(error => {
      console.log(error);
    })
  }

  DeleteTask(id: string) {
    this.taskRef = this.db.object('task-list/' + id);
    this.taskRef.remove()
    .catch(error => {
      console.log(error);
    })
  }
}
