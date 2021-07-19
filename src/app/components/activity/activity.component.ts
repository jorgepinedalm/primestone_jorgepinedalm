import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Activity } from 'src/app/models/task';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @Input() task: Activity|null = null;
  @Output() edit = new EventEmitter<Activity>();

  constructor() { }

  ngOnInit(): void {
  }

}
