import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import {PArecordService} from '../_services/parecord.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  users: User[] = [];
  records = [];
  avgcalories: number;
  avgminutes: number;
  minuterate: number;
  rank: number;

  constructor(private userService: UserService,
              private recordService: PArecordService) { }

  ngOnInit() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      users.forEach(user => {
        this.recordService.getAverage(user.username).pipe(first()).subscribe(record => {
          this.records.push(record);
          // sort method
          this.records.sort((a, b) => {
            return b.avgminutes - a.avgminutes;
          });
          this.records.forEach( (value) => {
            value.rank = this.records.indexOf(value) + 1;
          });
        });
      });
    });
  }

}
