import { StudentModel } from '@enrollment/data-models';
import { Student } from '../entities/enrollment/student.entity';

export class EnrollmentConverter {
  static toStudent(studentModel: StudentModel, update: boolean): Student {
    const student: Student = new Student();
    console.log('actualizar ' + update + ' converter ' + studentModel);
    if (update) {
      student.id = studentModel.id;
    }

    student.studentId = studentModel.student.id;
    student.fatherId = studentModel.father.id;
    student.motherId = studentModel.mother.id;
    student.legalGuardianId = studentModel.legalGuardian.id;

    return student;
  }
}
