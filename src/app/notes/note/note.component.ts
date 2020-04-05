import { Component, Input } from '@angular/core';

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
}
