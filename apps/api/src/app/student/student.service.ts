import { LegalGuardianEnum, StudentModel } from '@enrollment/data-models';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityManager,
  getConnection,
  Transaction,
  TransactionManager,
} from 'typeorm';
import { Person } from '../entities/configuration/person.entity';
import { Student } from '../entities/enrollment/student.entity';
import { PersonService } from '../person/person.service';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private readonly studentRepository: StudentRepository,
    private readonly personService: PersonService,
    private readonly logger: Logger
  ) {
    logger.setContext(StudentService.name);
  }

  @Transaction()
  async saveEnrollment(
    @TransactionManager() manager: EntityManager,
    studentModel: StudentModel
  ) {
    this.logger.log('Save enrollment...');
    const student: Student = this.studentRepository.create();
    const l = getConnection();
    const r = l.createQueryRunner();

    // Save student person.
    studentModel.student = await manager
      .getRepository(Person)
      .save(studentModel.student);

    student.studentId = studentModel.student.id;

    // Save father person.
    studentModel.father = await manager
      .getRepository(Person)
      .save(studentModel.father);
    student.fatherId = studentModel.father.id;

    // Save mother person.
    studentModel.mother = await manager
      .getRepository(Person)
      .save(studentModel.mother);
    student.motherId = studentModel.mother.id;

    switch (studentModel.typeLegalGuardian) {
      case LegalGuardianEnum.OTHER:
        studentModel.legalGuardian = await manager
          .getRepository(Person)
          .save(studentModel.legalGuardian);
        student.legalGuardianId = studentModel.legalGuardian.id;
        break;
      case LegalGuardianEnum.FATHER:
        student.legalGuardianId = studentModel.father.id;
        break;
      case LegalGuardianEnum.MOTHER:
        student.legalGuardianId = studentModel.mother.id;
        break;
      default:
        student.legalGuardianId = studentModel.mother.id;
        break;
    }

    student.year = studentModel.year;
    student.gradeId = studentModel.grade;
    student.enrollmentNumber = studentModel.enrollmentNumber;
    student.sheetNumber = studentModel.sheetNumber;

    await manager.getRepository(Student).save(student);
    studentModel.id = student.id;

    return studentModel;
  }
}
