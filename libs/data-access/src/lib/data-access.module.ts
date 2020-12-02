import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ListService } from './services/list.service';
import { LocationService } from './services/location.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [LocationService, ListService],
  exports: [],
})
export class DataAccessModule {}
