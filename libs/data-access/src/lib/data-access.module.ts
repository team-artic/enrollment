import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ListService } from './services/list.service';
import { LocationService } from './services/location.service';
import { StudentService } from './services/student.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [LocationService, ListService, StudentService],
  exports: [],
})
export class DataAccessModule {}
