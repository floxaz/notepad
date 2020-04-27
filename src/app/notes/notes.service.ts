import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  sortByMostRecent = new BehaviorSubject<boolean>(true);
  pageChanged = new Subject<null>();
  totalPages = new Subject<number>();
  constructor(private http: HttpClient) { }

  fetchNotes(params) {
    return this.http.get<any>(`${environment.appUrl}/api/notes`, { params })
    .pipe(map(res => {
      console.log(res);
      this.totalPages.next(res.pages);
      this.formatData(res.data.notes);
      return res;
    }), catchError(err => {
      console.log(err);
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
