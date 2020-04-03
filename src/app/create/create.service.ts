import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  constructor(private http: HttpClient) {}

  createNewNote(subject: string, content: string) {
    const body = {
      subject,
      content
    };
    this.http.post('http://localhost:3000/api/notes/', body)
    .subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
}
