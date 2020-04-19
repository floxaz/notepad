import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  onSearch() {
    console.log(this.searchForm);
  }

  onSelectSheet() {
    this.selectSheet = !this.selectSheet;
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl(null, [Validators.required, Validators.maxLength(30)])
    });
  }
}
