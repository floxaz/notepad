import { Component, Input } from '@angular/core';
import { NoteService } from './note.service';

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

  constructor(private noteService: NoteService) {}

  onDelete() {
    this.noteService.deleteNote(this.id);
  }
}
