import { Component, Input } from '@angular/core';
import { NoteService } from './note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  @Input() id: string;
  @Input() subject: string;
  @Input() content: string;
  @Input() date: string;

  constructor(
    private noteService: NoteService,
    private router: Router) {}

  onEdit() {
    this.router.navigate(['edit', this.id]);
    console.log('kek');
    // this.router.createUrlTree(['edit'], {
    //   queryParams: {
    //     id: this.id
    //   }
    // });
  }

  onDelete() {
    this.noteService.deleteNote(this.id);
  }
}
