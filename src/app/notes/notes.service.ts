import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private http: HttpClient) {}

  fetchNotes() {
    return this.http.get<any>('http://localhost:3000/api/notes')
    .pipe(map(res => {
      const { notes } = res.data;
      notes.forEach(note => {
        note.date = moment(note.date).fromNow();
      });
      return notes;
    }), catchError(err => {
      return null;
    }));
  }
}
