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

  createNewNote(subject: string, content: string, sheet: string) {
    const body = {
      subject,
      content,
      sheet
    };
    this.http.post<any>('http://localhost:3000/api/notes/', body)
    .pipe(map(res => {
      const { note } = res.data;
      note.date = moment(note.date).fromNow();
      return note;
    }))
    .subscribe(note => {
      this.created.next(note);
    }, err => {
      console.log(err);
    });
  }

  fetchOneNote(id: string) {
    return this.http.get<any>(`http://localhost:3000/api/notes/${id}`)
    .pipe(map(res => {
      return { ...res.data.note };
    }));
  }

  updateNote(id: string, body: any) {
    body.date = new Date().toISOString();
    body.edited = true;
    return this.http.patch<any>(`http://localhost:3000/api/notes/${id}`, body)
    .pipe(map(res => {
      return res.data.note;
    }));
  }
}
