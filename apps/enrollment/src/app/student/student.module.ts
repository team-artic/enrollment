import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EnrollmentUiModule } from '@enrollment/enrollment/ui';

import { StudentFormComponent } from './student-form/student-form.component';
import { StudentRoutingModule } from './student-routing.module';
import { StudentsComponent } from './students/students.component';

@NgModule({
  declarations: [StudentsComponent, StudentFormComponent],
  imports: [CommonModule, StudentRoutingModule, EnrollmentUiModule],
})
export class StudentModule {}
