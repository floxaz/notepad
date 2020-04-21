import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from './notes.service';
import { NoteService } from './note/note.service';
import { Subscription } from 'rxjs';
import { CreateService } from '../create/create.service';
import { Note } from '../shared/note.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  loading = true;
  sortByMostRecent: boolean;
  deletedSub: Subscription;
  createdSub: Subscription;
  sortSub: Subscription;

  constructor(
    private notesService: NotesService,
    private noteService: NoteService,
    private createService: CreateService
  ) { }

  ngOnInit() {
    this.notesService.fetchNotes({ sort: '-date' })
      .subscribe(res => {
        this.notes = res;
        this.loading = false;
      });

    this.deletedSub = this.noteService.deleted
      .subscribe(deletedId => {
        const index = this.notes.findIndex(note => note._id === deletedId);
        this.notes.splice(index, 1);
      });

    this.createdSub = this.createService.created
      .subscribe(note => {
        if (this.sortByMostRecent) {
          console.log('yes');
          this.notes.unshift(note);
        } else {
          this.notes.push(note);
        }
      });

    this.sortSub = this.notesService.sortByMostRecent
      .subscribe(sort => {
        this.sortByMostRecent = sort;
      });

    this.notesService.notesFilter
      .pipe(switchMap(params => {
        return this.notesService.fetchNotes(params);
      }))
      .subscribe(res => {
        this.notes = res;
      });
  }

  ngOnDestroy() {
    this.deletedSub.unsubscribe();
    this.createdSub.unsubscribe();
    this.sortSub.unsubscribe();
  }
}
