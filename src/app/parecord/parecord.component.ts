import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PARecord} from '../_models/PARecord';
import {NotificationService} from '../_services/notification.service';
import {UserService} from '../_services/user.service';
import {first} from 'rxjs/operators';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'parecord-component',
  templateUrl: './parecord.component.html',
  styleUrls: ['./parecord.component.css']
})
export class ParecordComponent implements OnInit {
  @Input() parecord: PARecord;
  @Output() deleteEvent = new EventEmitter<Date>();

   mode = 'determinate';

   bufferValue = 0;

   activities = ['directions_walk', 'directions_run', 'directions_bike'];


   color = 'primary';
   warn = 'warn';

   activity = this.activities[0];
   calprogressvalue = 0;
   minprogressvalue = 0;
   username: string;

  constructor(private notifService: NotificationService,
              private userService: UserService) { }

  delete(date) {
    this.deleteEvent.emit(date);
  }

  notImplemented(message) {

    this.notifService.notImplementedWarning(message);
  }

  ngOnInit() {
    this.activity = this.activities[this.parecord.activityType];
    this.userService.getUser(this.parecord.createdBy).pipe(first()).subscribe(user => {
      this.username = user;
      this.userService.getgoals(this.username).pipe(first()).subscribe(result => {
        this.calprogressvalue = Math.round(this.parecord.calories / result.goals.caloriegoal * 100);
        this.minprogressvalue = Math.round(this.parecord.minutes / result.goals.minutegoal * 100);
      });
    });
    // use userService to get the goal values corresponding the username that created the parecord
    // and then use the obtained values to properly visualize the progress towards the goal.


  //
    //
  }


}
