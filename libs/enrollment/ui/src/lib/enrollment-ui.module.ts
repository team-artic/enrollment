import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EnrollmentMaterialModule } from '@enrollment/enrollment/material';

import { EnrollComponent } from './enroll/enroll.component';
import { TableComponent } from './table/table.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { DataAccessModule } from '../../../../data-access/src/lib/data-access.module';

@NgModule({
  imports: [
    CommonModule,
    EnrollmentMaterialModule,
    ReactiveFormsModule,
    DataAccessModule,
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
