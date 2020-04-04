import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  createNote = false;
  createBtnText = 'Create';

  onCreate = () => {
    this.createNote = !this.createNote;
    this.createBtnText = this.createNote ? 'Close' : 'Create';
  }

}
