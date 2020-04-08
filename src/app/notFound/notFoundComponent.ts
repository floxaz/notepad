import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './notFoundComponent.html',
  styleUrls: ['./notFoundComponent.scss']
})
export class NotFoundComponent {
  constructor(private route: Router) {}

  goBack() {
    this.route.navigate(['']);
  }
}
