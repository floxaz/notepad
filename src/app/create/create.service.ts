import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  created = new Subject<any>();
  constructor(private http: HttpClient) {}

  createNewNote(subject: string, content: string) {
    const body = {
      subject,
      content
    };
    this.http.post<any>('http://localhost:3000/api/notes/', body)
    .pipe(map(res => {
      const { note } = res.data;
      note.date = moment(note.date).fromNow();
      return note;
    }))
    .subscribe(note => {
      console.log(note);
      this.created.next(note);
    }, err => {
      console.log(err);
    });
  }
}
