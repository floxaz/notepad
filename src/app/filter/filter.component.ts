import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { NotesService } from '../notes/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filterForm: FormGroup;
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

  constructor(
    private notesService: NotesService,
    private router: Router
  ) { }

  onSearch() {
    const search = this.filterForm.get('searchForm.search').value;
    this.filter();
    if (search === '') {
      this.filterForm.get('searchForm').markAsPristine();
    }
  }

  sortByDate() {
    const sort = this.filterForm.get('sort').value === '-date';
    this.notesService.sortByMostRecent.next(sort);
    this.filter();
  }

  filter() {
    const sheetName = this.filterForm.get('sheet').value;
    const index = this.sheetNames.indexOf(sheetName);
    let sheet = this.sheets[index];
    if (!sheet) {
      sheet = '';
    }
    const filterValues = {
      sheet,
      search: this.filterForm.get('searchForm.search').value || '',
      sort: this.filterForm.get('sort').value
    };
    this.router.navigate(['/'], {
      queryParams: {
        ...filterValues
      }
    });
  }

  ngOnInit() {
    this.filterForm = new FormGroup({
      searchForm: new FormGroup({
        search: new FormControl(null, Validators.maxLength(30))
      }),
      sheet: new FormControl(''),
      sort: new FormControl('-date')
    });

    this.notesService.sortByMostRecent.next(
      this.filterForm.get('sort').value === '-date'
    );
  }
}
