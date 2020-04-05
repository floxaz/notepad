import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from './notes.service';
import { NoteService } from './note/note.service';
import { Subscription } from 'rxjs';
import { CreateService } from '../create/create.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  notes = [];
  deletedSub: Subscription;
  createdSub: Subscription;

  constructor(
    private notesService: NotesService,
    private noteService: NoteService,
    private createService: CreateService
  ) { }

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

    this.createdSub = this.createService.created
      .subscribe(note => {
        this.notes.push(note);
      });
  }

  ngOnDestroy() {
    this.deletedSub.unsubscribe();
    this.createdSub.unsubscribe();
  }
}
