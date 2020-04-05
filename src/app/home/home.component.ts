import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  createNote = false;
  createBtnText = 'Create';

  onCreate = () => {
    this.createNote = !this.createNote;
    this.createBtnText = this.createNote ? 'Close' : 'Create';
  }

  closeCreateNote() {
    this.createNote = false;
    this.createBtnText = 'Create';
  }
}
