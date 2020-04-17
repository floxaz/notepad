import { Component, Input } from '@angular/core';
import { NoteService } from './note.service';
import { Router } from '@angular/router';
import { LightenDarkenColor } from 'lighten-darken-color';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent  {
  @Input() id: string;
  @Input() subject: string;
  @Input() content: string;
  @Input() date: string;
  @Input() set sheet(value: string) {
    this._sheet = value;
    this.secondaryColor = LightenDarkenColor('#' + value, -40);
  }
  get sheet(): string {
    return this._sheet;
  }
  secondaryColor: string;
  optionHovered = false;
  private _sheet: string;

  constructor(
    private noteService: NoteService,
    private router: Router) {}

  onEdit() {
    this.router.navigate(['edit', this.id]);
  }

  onDelete() {
    this.noteService.deleteNote(this.id);
  }
}
