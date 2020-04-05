import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateService } from './create.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @Input() creationMode = false;
  @Output() createdNewNote = new EventEmitter<void>();
  btnText = 'Attach';
  createForm: FormGroup;
  constructor(
    private createService: CreateService,
    private route: ActivatedRoute,
    private router: Router) { }

  onSubmit() {
    console.log(this.createForm);
    const { subject, content } = this.createForm.value;
    this.createService.createNewNote(subject, content);
    this.createForm.reset();
    this.createdNewNote.emit();
  }

  onGoBack() {
    this.router.navigate(['/']);
  }

  setForm = (subject = null, content = null) => {
    this.createForm = new FormGroup({
      subject: new FormControl(subject, [Validators.required, Validators.maxLength(30)]),
      content: new FormControl(content, [Validators.required, Validators.maxLength(250)])
    });
  }

  ngOnInit() {
    this.setForm();

    if (!this.creationMode) {
      this.btnText = 'Edit';
      this.route.params
        .pipe(
          map(({ id }) => id),
          switchMap(id => {
            return this.createService.fetchOneNote(id);
          }))
        .pipe(map(({ note }) => note))
        .subscribe(({ subject, content }) => {
          this.createForm.setValue({
            subject,
            content
          });
        });
    }
  }
}

