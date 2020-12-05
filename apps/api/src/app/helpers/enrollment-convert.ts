import { StudentModel } from '@enrollment/data-models';
import { Student } from '../entities/enrollment/student.entity';

export class EnrollmentConverter {
  static toStudentModel(student: Student): StudentModel {
    const studentModel: StudentModel = new StudentModel();

    return studentModel;
  }
}
