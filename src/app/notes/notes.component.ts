import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes = [];
  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notesService.fetchNotes()
    .subscribe(res => {
      this.notes = res;
      console.log(this.notes);
    });
  }
}
