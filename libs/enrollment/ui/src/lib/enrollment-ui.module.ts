import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DataAccessModule } from '@enrollment/data-access';
import { EnrollmentMaterialModule } from '@enrollment/enrollment/material';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { AgGridModule } from 'ag-grid-angular';

import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { EnrollComponent } from './enroll/enroll.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    CommonModule,
    EnrollmentMaterialModule,
    ReactiveFormsModule,
    DataAccessModule,
    DigitOnlyModule,
    AgGridModule.withComponents([])
  ],
  declarations: [TableComponent, EnrollComponent, AutocompleteComponent],
  exports: [
    TableComponent,
    EnrollComponent,
    AutocompleteComponent,
    EnrollmentMaterialModule,
  ],
})
export class EnrollmentUiModule {}
