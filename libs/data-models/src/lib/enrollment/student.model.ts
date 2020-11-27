import { PersonModel } from './../configuration/person.model';

export class StudentModel {
  id!: number;
  student!: PersonModel;
  father!: PersonModel;
  mother!: PersonModel;
  legalGuardian!: PersonModel;
  year!: number;
  grade!: number;
  enrollmentNumber!: string;
  sheetNumber!: string;
}
