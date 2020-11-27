import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentModel } from '@enrollment/data-models';

@Component({
  selector: 'enrollment-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollComponent implements OnInit {
  @Output() onSave = new EventEmitter<StudentModel>();

  enrollForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
  }

  ngOnInit(): void {}

  enroll() {
    this.onSave.emit(this.enrollForm.value);
  }
}
