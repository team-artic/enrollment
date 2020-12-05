import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
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
import {
  startWith,
  map,
  switchMap,
  distinctUntilChanged,
} from 'rxjs/operators';
import { AutocompleteModel } from '../autocomplete/autocomplete.model';
import {
  LocationService,
  ListService,
  StudentService,
} from '@enrollment/data-access';
import { LegalGuardianEnum } from '@enrollment/data-models';

@Component({
  selector: 'enrollment-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollComponent implements OnInit {
  @Output() onSave = new EventEmitter<StudentModel>();

  enrollForm: FormGroup;
  placeOfBirthCtrl = new FormControl();
  neighborhoodCtrl = new FormControl();
  neighborhoodCtrlFather = new FormControl();
  neighborhoodCtrlMother = new FormControl();
  neighborhoodCtrlLegalGuardian = new FormControl();
  filteredStates: Observable<AutocompleteModel[]>;
  filteredNeighborhood: Observable<AutocompleteModel[]>;
  filteredNeighborhoodFather: Observable<AutocompleteModel[]>;
  filteredNeighborhoodMother: Observable<AutocompleteModel[]>;
  filteredNeighborhoodLegalGuardian: Observable<AutocompleteModel[]>;
  filteredIdentificationTypes: Observable<GetListModel[]>;
  filteredBloodTypes: Observable<GetListModel[]>;
  filteredGradeTypes: Observable<GetListModel[]>;

  fatherLegalGuardian = new FormControl();
  motherLegalGuardian = new FormControl();
  showOtherLegalGuardian = true;

  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private listService: ListService,
    private studentService: StudentService
  ) {
    this.enrollForm = this.formBuilder.group({
      id: [],
      student: this.formBuilder.group({
        id: [],
        firstName: ['', [Validators.required]],
        secondName: [],
        firstSurname: ['', [Validators.required]],
        secondSurname: [],
        typeIdentificationId: [],
        identification: ['', [Validators.required]],
        birthDate: [],
        placeBirthId: [],
        bloodGroupId: [],
        sisben: [false],
        healthPromotingCompany: [],
        phone: [
          '',
          [
            Validators.minLength(7),
            Validators.maxLength(10),
            Validators.required,
          ],
        ],
        address: ['', [Validators.required]],
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
        typeIdentificationId: [],
        identification: ['', [Validators.required]],
        occupation: [],
        address: ['', [Validators.required]],
        neighborhoodId: [],
        phone: [
          '',
          [
            Validators.minLength(7),
            Validators.maxLength(10),
            Validators.required,
          ],
        ],
      }),
      mother: this.formBuilder.group({
        id: [],
        firstName: ['', [Validators.required]],
        secondName: [],
        firstSurname: ['', [Validators.required]],
        secondSurname: [],
        typeIdentificationId: [],
        identification: ['', [Validators.required]],
        occupation: [],
        address: ['', [Validators.required]],
        neighborhoodId: [],
        phone: [
          '',
          [
            Validators.minLength(7),
            Validators.maxLength(10),
            Validators.required,
          ],
        ],
      }),
      legalGuardian: this.formBuilder.group({
        id: [],
        firstName: ['', [Validators.required]],
        secondName: [],
        firstSurname: ['', [Validators.required]],
        secondSurname: [],
        typeIdentificationId: [],
        identification: ['', [Validators.required]],
        occupation: [],
        address: ['', [Validators.required]],
        neighborhoodId: [],
        phone: [
          '',
          [
            Validators.minLength(7),
            Validators.maxLength(10),
            Validators.required,
          ],
        ],
      }),
      year: [new Date().getFullYear(), [Validators.required]],
      grade: [null, [Validators.required]],
      enrollmentNumber: [],
      sheetNumber: [],
      typeLegalGuardian: [],
    });

    this.filteredStates = this.placeOfBirthCtrl.valueChanges.pipe(
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
      switchMap((value) => this.filterNeighborhood(value))
    );
    this.filteredNeighborhoodFather = this.neighborhoodCtrlFather.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this.filterNeighborhood(value))
    );
    this.filteredNeighborhoodMother = this.neighborhoodCtrlMother.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this.filterNeighborhood(value))
    );
    this.filteredNeighborhoodLegalGuardian = this.neighborhoodCtrlLegalGuardian.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this.filterNeighborhood(value))
    );

    this.filteredIdentificationTypes = this.listService.getIdentificationTypes();
    this.filteredBloodTypes = this.listService.getBloodTypes();
    this.filteredGradeTypes = this.listService.getGradeType();

    this.fatherLegalGuardian.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value) {
          this.motherLegalGuardian.setValue(null);
          this.enrollForm
            .get('typeLegalGuardian')
            ?.patchValue(LegalGuardianEnum.FATHER);
          this.changePermissionLegalGuardian(true);
          this.showOtherLegalGuardian = !value;
        } else {
          this.showOtherLegalGuardian = true;
          this.enrollForm
            .get('typeLegalGuardian')
            ?.patchValue(LegalGuardianEnum.OTHER);
          this.changePermissionLegalGuardian(false);
        }
      });

    this.motherLegalGuardian.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (value) {
          this.fatherLegalGuardian.setValue(null);
          this.enrollForm
            .get('typeLegalGuardian')
            ?.patchValue(LegalGuardianEnum.MOTHER);
          this.changePermissionLegalGuardian(true);
          this.showOtherLegalGuardian = false;
        } else {
          this.showOtherLegalGuardian = true;
          this.enrollForm
            .get('typeLegalGuardian')
            ?.patchValue(LegalGuardianEnum.OTHER);
          this.changePermissionLegalGuardian(false);
        }
      });
  }

  ngOnInit(): void {
    // ..
  }

  enroll() {
    const model = this.enrollForm.value;
    this.onSave.emit(model);
    this.studentService.enroll(model).subscribe((data) => console.log(data));
  }

  selectedPlaceOfBirth($event: AutocompleteModel) {
    this.enrollForm.get('student.placeBirthId')?.setValue($event.id);
  }

  selectedNeighborhood(
    $event: AutocompleteModel,
    object: 'student' | 'father' | 'mother' | 'legalGuardian'
  ) {
    this.enrollForm.get(`${object}.neighborhoodId`)?.setValue($event.id);
  }

  copyAddress(object: 'father' | 'mother' | 'legalGuardian') {
    const studentAddress = this.enrollForm.get('student.address')?.value;
    this.enrollForm.get(`${object}.address`)?.setValue(studentAddress);
  }

  private filterNeighborhood(value: string): Observable<AutocompleteModel[]> {
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
  }

  private changePermissionLegalGuardian(remove: boolean) {
    if (remove) {
      this.enrollForm.get('legalGuardian.firstName')?.disable();
      this.enrollForm.get('legalGuardian.firstSurname')?.disable();
      this.enrollForm.get('legalGuardian.identification')?.disable();
      this.enrollForm.get('legalGuardian.address')?.disable();
      this.enrollForm.get('legalGuardian.phone')?.disable();
    } else {
      this.enrollForm.get('legalGuardian.firstName')?.enable();
      this.enrollForm.get('legalGuardian.firstSurname')?.enable();
      this.enrollForm.get('legalGuardian.identification')?.enable();
      this.enrollForm.get('legalGuardian.address')?.enable();
      this.enrollForm.get('legalGuardian.phone')?.enable();
    }
  }

  log() {
    console.log(this.enrollForm);
  }
}
