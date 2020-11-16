import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EnrollmentMaterialModule } from '@enrollment/enrollment/material';

import { EnrollComponent } from './enroll/enroll.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [CommonModule, EnrollmentMaterialModule, ReactiveFormsModule],
  declarations: [TableComponent, EnrollComponent],
  exports: [TableComponent, EnrollComponent],
})
export class EnrollmentUiModule {}
