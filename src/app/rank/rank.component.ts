import {Component, Input, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {
  @Input() record;
  name: string;
  first: string;
  last: string;
  avgcalories: number;
  avgminutes: number;
  calrate: number;
  minuterate: number;
  accentColor: ThemePalette = 'accent';
  color: string;
  constructor() { }

  ngOnInit() {
    this.calrate = Math.round(this.record.avgcalories / this.record.calgoal * 100);
    this.minuterate = Math.round(this.record.avgminutes / this.record.minutegoal * 100);
  }
  getRandomColor() {
    this.color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + this.color).slice(-6);
  }
}
