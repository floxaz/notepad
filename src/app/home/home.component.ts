import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from '../notes/notes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  createNote = false;
  createBtnText = 'Create';
  totalPagesSub: Subscription;
  totalPages = 1;
  lastValidPage: number;

  constructor(private notesService: NotesService) { }

  onCreate = () => {
    this.createNote = !this.createNote;
    this.createBtnText = this.createNote ? 'Close' : 'Create';
  }

  closeCreateNote() {
    this.createNote = false;
    this.createBtnText = 'Create';
  }

  pageChanged(page: number) {
    this.notesService.pageChanged.next(page);
  }

  ngOnInit() {
    this.totalPagesSub = this.notesService.totalPages
    .subscribe(totalPages => {
      this.totalPages = totalPages;
    });
  }

  ngOnDestroy() {
    this.totalPagesSub.unsubscribe();
  }
}
