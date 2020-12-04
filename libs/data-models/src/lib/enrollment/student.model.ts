import { LegalGuardianEnum } from '../enum/legal-guardian.enum';
import { PersonModel } from './../configuration/person.model';

export class StudentModel {
  id!: number;
  student!: PersonModel;
  father!: PersonModel;
  mother!: PersonModel;
  typeLegalGuardian!: LegalGuardianEnum;
  legalGuardian!: PersonModel;
  year!: number;
  grade!: number;
  enrollmentNumber!: string;
  sheetNumber!: string;
}
