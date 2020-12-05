import { LegalGuardianEnum, StudentModel } from '@enrollment/data-models';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginateRaw,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { Person } from '../entities/configuration/person.entity';
import { Student } from '../entities/enrollment/student.entity';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(
    @TransactionManager() private manager: EntityManager,
    @InjectRepository(StudentRepository)
    private readonly studentRepository: StudentRepository,
    private readonly logger: Logger
  ) {
    logger.setContext(StudentService.name);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Student>> {
    const queryBuilder = this.studentRepository.createQueryBuilder('s');
    queryBuilder.leftJoinAndSelect('s.student', 'p');
    queryBuilder.leftJoinAndSelect('s.grade', 'gr');
    queryBuilder
      .leftJoinAndSelect('p.typesIdentification', 't')
      .leftJoinAndSelect('p.gender', 'g')
      .select([
        's.id as id',
        't.name as identificationType',
        'p.identification as identification',
        'g.name as gender',
        'p.phone as phone',
        'gr.name as grade',
      ])
      .addSelect(
        "CONCAT(p.firstName, ' ', p.secondName, ' ',  p.firstSurname, ' ', p.secondSurname)",
        'name'
      );
    queryBuilder.orderBy('p.firstName', 'DESC');
    return paginateRaw(queryBuilder, options);
  }

  @Transaction()
  async saveEnrollment(studentModel: StudentModel) {
    const student: Student = this.studentRepository.create();

    // Save student person.
    studentModel.student = await this.manager
      .getRepository(Person)
      .save(studentModel.student);

    student.studentId = studentModel.student.id;

    // Save father person.
    studentModel.father = await this.manager
      .getRepository(Person)
      .save(studentModel.father);
    student.fatherId = studentModel.father.id;

    // Save mother person.
    studentModel.mother = await this.manager
      .getRepository(Person)
      .save(studentModel.mother);
    student.motherId = studentModel.mother.id;

    switch (studentModel.typeLegalGuardian) {
      case LegalGuardianEnum.OTHER:
        studentModel.legalGuardian = await this.manager
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

    await this.manager.getRepository(Student).save(student);
    studentModel.id = student.id;

    return studentModel;
  }
}
