import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentsComponent } from '../students/students.component';

@NgModule({
  declarations: [StudentsComponent],
  imports: [CommonModule, StudentRoutingModule],
})
export class StudentModule {}
