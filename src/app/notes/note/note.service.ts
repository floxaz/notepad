import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  deleted = new Subject<string>();
  constructor(private http: HttpClient) {}

  deleteNote(id: string) {
    this.http.delete(`http://localhost:3000/api/notes/${id}`)
    .subscribe(() => {
      this.deleted.next(id);
    });
  }
}
