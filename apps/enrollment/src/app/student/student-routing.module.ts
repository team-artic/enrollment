import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentFormComponent } from './student-form/student-form.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  {
    path: '',
    component: StudentFormComponent,
  },
  {
    path: 'list',
    component: StudentListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
