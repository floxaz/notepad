import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private http: HttpClient) {}

  fetchNotes() {
    return this.http.get<any>('http://localhost:3000/api/notes')
    .pipe(map(res => {
      return res.data.notes;
    }), catchError(err => {
      console.log(err);
      return null;
    }));
  }
}
