import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  deleted = new Subject<string>();
  constructor(private http: HttpClient) {}

  deleteNote(id: string) {
    this.http.delete(`${environment.appUrl}/api/notes/${id}`)
    .subscribe(() => {
      this.deleted.next(id);
    });
  }
}
