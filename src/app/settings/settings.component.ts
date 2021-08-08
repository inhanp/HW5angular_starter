import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {UserService} from '../_services/user.service';
import {first} from 'rxjs/operators';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  calorie = 2000;
  minute = 165;
  constructor(private userService: UserService,
              private authService: AuthService,
              private notif: NotificationService) {}
  ngOnInit() {
    this.userService.getgoals(this.authService.currentUserValue.username).pipe(first()).subscribe(result => {
      this.calorie = result.goals.caloriegoal;
      this.minute = result.goals.minutegoal;
    });
  }
  calorieLabel(calorie: number) {
    if (this.calorie !== calorie) {
      this.calorie = calorie;
    }
    return calorie;
  }
  minuteLabel(minute: number) {
    if (this.minute !== minute) {
      this.minute = minute;
    }
    return minute;
  }
  submit() {
    this.userService.setgoals({calories: this.calorie, minutes: this.minute}).pipe(first()).subscribe(result => {
      this.notif.showNotif('Goals updated successfully!', 'confirmation');
    });
  }

}
