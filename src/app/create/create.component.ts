import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateService } from './create.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @Output() createdNewNote = new EventEmitter<void>();
  constructor(private createService: CreateService) { }

  createForm: FormGroup;

  onSubmit() {
    console.log(this.createForm);
    const { subject, content } = this.createForm.value;
    this.createService.createNewNote(subject, content);
    this.createForm.reset();
    this.createdNewNote.emit();
  }

  ngOnInit() {
    this.createForm = new FormGroup({
      subject: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      content: new FormControl(null, [Validators.required, Validators.maxLength(250)])
    });
  }
}

