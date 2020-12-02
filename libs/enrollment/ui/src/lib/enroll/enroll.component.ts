import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  GetListModel,
  GetLocationModel,
  StudentModel,
} from '@enrollment/data-models';
import { Observable, of } from 'rxjs';
import { startWith, map, switchMap } from 'rxjs/operators';
import { AutocompleteModel } from '../autocomplete/autocomplete.model';
import { LocationService, ListService } from '@enrollment/data-access';

@Component({
  selector: 'enrollment-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollComponent implements OnInit {
  @Output() onSave = new EventEmitter<StudentModel>();
  @Input() autocompleteMunicipaltity: Observable<AutocompleteModel[]> = of([]);

  enrollForm: FormGroup;
  stateCtrl = new FormControl();
  neighborhoodCtrl = new FormControl();
  filteredStates: Observable<AutocompleteModel[]>;
  filteredNeighborhood: Observable<AutocompleteModel[]>;
  filteredIdentificationTypes: Observable<GetListModel[]>;
  filteredBloodTypes: Observable<GetListModel[]>;

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private listService: ListService
  ) {
    this.enrollForm = this.formBuilder.group({
      id: [],
      student: this.formBuilder.group({
        id: [],
        firstName: [],
        secondName: [],
        firstSurname: [],
        secondSurname: [],
        typeIdentification: [],
        identification: [],
        birthDate: [],
        placeBirthId: [],
        bloodGroupId: [],
        sisben: [false],
        healthPromotingCompany: [],
        phone: [],
        address: [],
        stratum: [],
        neighborhoodId: [],
        institutionProcedenica: [],
        displaced: [false],
      }),
      father: this.formBuilder.group({
        id: [],
        firstName: [],
        secondName: [],
        firstSurname: [],
        secondSurname: [],
        typeIdentification: [],
        identification: [],
        occupation: [],
        address: [],
        neighborhoodId: [],
        phone: [],
      }),
      mother: this.formBuilder.group({
        id: [],
        firstName: [],
        secondName: [],
        firstSurname: [],
        secondSurname: [],
        typeIdentification: [],
        identification: [],
        occupation: [],
        address: [],
        neighborhoodId: [],
        phone: [],
      }),
      legalGuardian: this.formBuilder.group({
        id: [],
        firstName: [],
        secondName: [],
        firstSurname: [],
        secondSurname: [],
        typeIdentification: [],
        identification: [],
        occupation: [],
        address: [],
        neighborhoodId: [],
        phone: [],
      }),
      year: [],
      grade: [],
      enrollmentNumber: [],
      sheetNumber: [],
    });

    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      switchMap((value) => {
        if (value) {
          return this.locationService.autocompleteMunicipality(value).pipe(
            map((x: GetLocationModel[]) => {
              return x.map((item) => {
                return {
                  name: item.name,
                  id: item.id,
                  subtitle: item.parent.name,
                };
              });
            })
          );
        } else {
          return of([]);
        }
      })
    );

    this.filteredNeighborhood = this.neighborhoodCtrl.valueChanges.pipe(
      startWith(''),
      switchMap((value) => {
        if (value) {
          return this.locationService.autocompleteNeighborhood(value).pipe(
            map((x: GetLocationModel[]) => {
              return x.map((item) => {
                return {
                  name: item.name,
                  id: item.id,
                  subtitle: item.parent.name,
                };
              });
            })
          );
        } else {
          return of([]);
        }
      })
    );

    this.filteredIdentificationTypes = this.listService.getIdentificationTypes();
    this.filteredBloodTypes = this.listService.getBloodTypes();
  }

  ngOnInit(): void {
    //.
  }

  enroll() {
    this.onSave.emit(this.enrollForm.value);
  }

  selectedPlaceOfBirth($event: AutocompleteModel) {
    this.enrollForm.get('student.placeBirthId')?.setValue($event.id);
  }
}
