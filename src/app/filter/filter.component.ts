import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotesService } from '../notes/notes.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  searchForm: FormGroup;
  sheets = [
    'fae7cb',
    '4cd3c2',
    'e6739f',
    'ffbd69',
    'f2ed6f'
  ];
  sheetNames = [
    'Beige',
    'Blue',
    'Rose',
    'Orange',
    'Yellow'
  ];
  @ViewChild('sheets') sheetsSelector: ElementRef;
  @ViewChild('date') dateSelector: ElementRef;
  selectSheet = false;

  constructor(private notesService: NotesService) { }

  onSearch() {
    const search = this.searchForm.get('search').value;
    this.notesService.notesFilter.next({ search });
    if (search === '') {
      this.searchForm.get('search').markAsPristine();
    }
    console.log(this.searchForm);
  }

  onSelectSheet() {
    const sheetName = this.sheetsSelector.nativeElement.value;
    const index = this.sheetNames.indexOf(sheetName);
    let sheet = this.sheets[index];
    if (!sheet) {
      sheet = '';
    }
    this.notesService.notesFilter.next({ sheet });
  }

  onDateSelect() {
    console.log(this.dateSelector.nativeElement.value);
    const sort = this.dateSelector.nativeElement.value;
    this.notesService.notesFilter.next({ sort });
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl(null, [
        Validators.maxLength(30)])
    });
  }
}
