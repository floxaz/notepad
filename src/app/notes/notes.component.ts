import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from './notes.service';
import { NoteService } from './note/note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  notes = [];
  deletedSub: Subscription;

  constructor(private notesService: NotesService,
              private noteService: NoteService) { }

  ngOnInit() {
    this.notesService.fetchNotes()
      .subscribe(res => {
        this.notes = res;
        console.log(this.notes);
      });

    this.deletedSub = this.noteService.deleted
      .subscribe(deletedId => {
        const index = this.notes.findIndex(note => note._id === deletedId);
        this.notes.splice(index, 1);
      });
  }

  ngOnDestroy() {
    this.deletedSub.unsubscribe();
  }
}
