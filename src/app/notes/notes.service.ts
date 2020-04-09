import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private http: HttpClient) { }

  fetchNotes() {
    return this.http.get<any>(`${environment.appUrl}/api/notes`)
    .pipe(map(res => {
      const { notes } = res.data;
      return this.formatData(notes);
    }), catchError(err => {
      return null;
    }));
  }

  private formatData(notes: any) {
    notes.forEach(note => {
      note.date = moment(note.date).fromNow();
      if (note.edited) {
        note.date = 'edited ' + note.date;
      }
    });
    return notes;
  }
}
