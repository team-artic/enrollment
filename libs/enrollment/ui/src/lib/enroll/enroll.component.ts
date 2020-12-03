import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
        firstName: ['', [Validators.required]],
        secondName: [],
        firstSurname: ['', [Validators.required]],
        secondSurname: [],
        typeIdentification: [],
        identification: ['', [Validators.required]],
        birthDate: [],
        placeBirthId: [],
        bloodGroupId: [],
        sisben: [false],
        healthPromotingCompany: [],
        phone: ['', [Validators.minLength(7), Validators.maxLength(10)]],
        address: [],
        stratum: [],
        neighborhoodId: [],
        institutionProcedenica: [],
        displaced: [false],
      }),
      father: this.formBuilder.group({
        id: [],
        firstName: ['', [Validators.required]],
        secondName: [],
        firstSurname: ['', [Validators.required]],
        secondSurname: [],
        typeIdentification: [],
        identification: ['', [Validators.required]],
        occupation: [],
        address: ['', [Validators.required]],
        neighborhoodId: [],
        phone: ['', [Validators.required]],
      }),
      mother: this.formBuilder.group({
        id: [],
        firstName: ['', [Validators.required]],
        secondName: [],
        firstSurname: ['', [Validators.required]],
        secondSurname: [],
        typeIdentification: [],
        identification: ['', [Validators.required]],
        occupation: [],
        address: ['', [Validators.required]],
        neighborhoodId: [],
        phone: ['', [Validators.required]],
      }),
      legalGuardian: this.formBuilder.group({
        id: [],
        firstName: ['', [Validators.required]],
        secondName: [],
        firstSurname: ['', [Validators.required]],
        secondSurname: [],
        typeIdentification: [],
        identification: ['', [Validators.required]],
        occupation: [],
        address: ['', [Validators.required]],
        neighborhoodId: [],
        phone: ['', [Validators.required]],
      }),
      year: [2020],
      grade: [103],
      enrollmentNumber: [103],
      sheetNumber: [101],
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
    // ..
  }

  enroll() {
    this.onSave.emit(this.enrollForm.value);
  }

  selectedPlaceOfBirth($event: AutocompleteModel) {
    this.enrollForm.get('student.placeBirthId')?.setValue($event.id);
  }

  selectedNeighborhood($event: AutocompleteModel) {
    this.enrollForm.get('student.neighborhoodId')?.setValue($event.id);
  }
}
