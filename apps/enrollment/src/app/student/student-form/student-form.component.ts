import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GetLocationModel, StudentModel } from '@enrollment/data-models';
import { AutocompleteModel } from '@enrollment/enrollment/ui';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { LocationService } from '../../services/location.service';

@Component({
  selector: 'enrollment-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentFormComponent implements OnInit {
  // autocompleteMunicipality$: Observable<AutocompleteModel[]>;

  constructor() {
    /*** */
  }

  ngOnInit(): void {
    //..
  }

  console($event: StudentModel) {
    console.log($event);
  }
}
