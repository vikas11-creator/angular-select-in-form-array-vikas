import { Component } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  filterForm!: FormGroup;
  filterKey: any = [];
  data: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {   
    this.filterKey = [];
    this.filterForm = this.fb.group({
      filterField: this.fb.array([]),
    });
    this.filterKey = [
      {
        filterDataSet: 'STARTS_WITH',
        value: 'Start with',
      },
      { filterDataSet: 'CONTAINS', value: 'Contains' },
      {
        filterDataSet: 'NOT_CONTAINS',
        value: 'Not contains',
      },
      { filterDataSet: 'ENDS_WITH', value: 'Ends with' },
      { filterDataSet: 'EQUALS', value: 'Equals' },
      {
        filterDataSet: 'NOT_EQUALS',
        value: 'Not equals',
      },
    ];
    this.checkPatchForm();
  }

  filterField(): FormArray {
    return this.filterForm.get('filterField') as FormArray;
  }

  checkPatchForm() {
    let res = JSON.parse(localStorage.getItem('formVal'));
    for (let i = 0; i < res.filterField.length; i++) {
      this.filterField().push(this.initX());
      this.filterForm.patchValue(res);
    }
  }

  initX() {
    return this.fb.group({
      filterColumn: ['', Validators.compose([Validators.required])],
    });
  }

  addX() {
    const control: any = this.filterForm.controls['filterField'];
    control.push(this.initX());
  }

  get textFilter(): any {
    let t: any = this.filterForm['controls']['filterField'];
    return t['controls'];
  }

  onSubmit(form) {
    console.log(form.value);
    localStorage.setItem('formVal', JSON.stringify(form.value));
  }
}
