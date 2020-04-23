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
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  loading = true;
  sortByMostRecent: boolean;
  deletedSub: Subscription;
  createdSub: Subscription;
  sortSub: Subscription;
  pageChangeSub: Subscription;

  constructor(
    private notesService: NotesService,
    private noteService: NoteService,
    private createService: CreateService
  ) { }

  private updateProperties(res) {
    this.notes = res.data.notes;
    this.itemsPerPage = res.results;
    this.currentPage = res.page;
    this.totalItems = res.total;
  }

  ngOnInit() {
    this.notesService.fetchNotes({ sort: '-date' })
      .subscribe(res => {
        this.updateProperties(res);
        this.loading = false;
      });

    this.deletedSub = this.noteService.deleted
      .subscribe(deletedId => {
        const index = this.notes.findIndex(note => note._id === deletedId);
        this.notes.splice(index, 1);
        this.totalItems -= 1;
      });

    this.createdSub = this.createService.created
      .subscribe(note => {
        this.totalItems += 1;
        if (this.sortByMostRecent) {
          this.notes.unshift(note);
        } else {
          this.notes.push(note);
        }
      });

    this.sortSub = this.notesService.sortByMostRecent
      .subscribe(sort => {
        this.sortByMostRecent = sort;
      });

    this.pageChangeSub = this.notesService.pageChanged
      .pipe(switchMap(page => {
        this.currentPage = page;
        return this.notesService.fetchNotes({ page });
      }))
      .subscribe(res => {
         this.notes = res.data.notes;
      });

    this.notesService.notesFilter
      .pipe(switchMap(params => {
        return this.notesService.fetchNotes(params);
      }))
      .subscribe(res => {
        this.updateProperties(res);
      });
  }

  ngOnDestroy() {
    this.deletedSub.unsubscribe();
    this.createdSub.unsubscribe();
    this.sortSub.unsubscribe();
    this.pageChangeSub.unsubscribe();
  }
}
