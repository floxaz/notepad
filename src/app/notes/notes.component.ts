import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from './notes.service';
import { NoteService } from './note/note.service';
import { Subscription } from 'rxjs';
import { CreateService } from '../create/create.service';
import { Note } from '../shared/note.model';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
  pageChanged = false;
  loading = true;
  sortByMostRecent: boolean;
  deletedSub: Subscription;
  createdSub: Subscription;
  sortSub: Subscription;
  pageChangeSub: Subscription;
  queryParams: any;

  constructor(
    private notesService: NotesService,
    private noteService: NoteService,
    private createService: CreateService,
    private route: ActivatedRoute
  ) { }

  private updateProperties(res) {
    // pagination bar breaks if you continuously update all 4 values
    if (!this.pageChanged) {
      this.notes = res.data.notes;
      this.currentPage = res.page;
      this.itemsPerPage = res.results;
      this.totalItems = res.total;
    } else {
      this.notes = res.data.notes;
      this.currentPage = res.page;
    }
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(switchMap(params => {
        this.queryParams = {...params};
        if (!this.queryParams.sort) {
          this.queryParams.sort = '-date';
        }
        return this.notesService.fetchNotes(this.queryParams);
      }))
      .subscribe(res => {
        this.updateProperties(res);
        this.loading = false;
        this.pageChanged = false;
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
      .subscribe(() => {
        this.pageChanged = true;
      });
  }

  ngOnDestroy() {
    this.deletedSub.unsubscribe();
    this.createdSub.unsubscribe();
    this.sortSub.unsubscribe();
    this.pageChangeSub.unsubscribe();
  }
}
