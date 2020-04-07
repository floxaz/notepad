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
  editedNoteId = undefined;
  subject: string;
  content: string;
  sheets = [
    '#fae7cb',
    '#4cd3c2',
    '#e6739f',
    '#ffbd69',
    '#f2ed6f'
  ];
  constructor(
    private createService: CreateService,
    private route: ActivatedRoute,
    private router: Router) { }

  onSubmit() {
    if (this.creationMode) {
      this.attachNote();
    } else {
      if (this.editedNoteId) {
        this.editNote();
      }
    }
  }

  onGoBack() {
    this.router.navigate(['/']);
  }

  setForm = (subject = null, content = null) => {
    this.createForm = new FormGroup({
      subject: new FormControl(subject, [Validators.required, Validators.maxLength(30)]),
      content: new FormControl(content, [Validators.required, Validators.maxLength(250)]),
      sheet: new FormControl(this.sheets[0])
    });
  }

  setUpdateForm = () => {
    this.btnText = 'Edit';
    this.route.params
      .pipe(
        map(({ id }) => id),
        switchMap(id => {
          this.editedNoteId = id;
          return this.createService.fetchOneNote(id);
        }))
      .pipe(map(({ note }) => note))
      .subscribe(({ subject, content }) => {
        this.subject = subject;
        this.content = content;

        this.createForm.setValue({
          subject,
          content,
          sheet: this.sheets[0]
        });
        console.log(this.createForm);
      });
  }

  private attachNote = () => {
    console.log(this.createForm);
    const { subject, content, sheet } = this.createForm.value;
    this.createService.createNewNote(subject, content, sheet);
    this.createForm.reset();
    this.createdNewNote.emit();
  }

  private editNote = () => {
    const body = {
      subject: this.createForm.get('subject').value,
      content: this.createForm.get('content').value
    };
    this.createService.updateNote(this.editedNoteId, body)
    .subscribe(() => {
      this.createForm.reset();
      this.onGoBack();
    });
  }

  ngOnInit() {
    this.setForm();

    if (!this.creationMode) {
      this.setUpdateForm();
    }
  }
}

