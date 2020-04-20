import { Component, OnInit } from '@angular/core';
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
  selectSheet = false;
  search = null;

  constructor(private notesService: NotesService) { }

  onSearch() {
    this.search = this.searchForm.get('search').value;
    this.notesService.notesFilter.next({ search: this.search });
    if (this.search === '') {
      this.searchForm.get('search').markAsPristine();
    }
    console.log(this.searchForm);
  }

  onSelectSheet() {
    this.selectSheet = !this.selectSheet;
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl(null, [
        Validators.maxLength(30)])
    });
  }
}
