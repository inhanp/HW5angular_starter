
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {PARecord} from '../_models/PARecord';




@Injectable({ providedIn: 'root' })
export class PArecordService {
  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<PARecord[]>(`http://localhost:3030/parecord/getparecords`);
  }

  add(type: number, date: Date, minutes: number, calories: number) {
    const parecord = {type, date, minutes, calories};
    return this.http.post(`http://localhost:3030/parecord/addparecord`, parecord);
  }

  edit(type: number, date: Date, minutes: number, calories: number) {
    const parecord = {type, date, minutes, calories};
    return this.http.post(`http://localhost:3030/parecord/editparecord`, parecord);
  }


  delete(date: string) {
    return this.http.delete(`http://localhost:3030/parecord/${date}`);

  }
  getAverage(username: string) {
    return this.http.get<any>(`http://localhost:3030/parecord/getaverages/${username}`);
  }


}
