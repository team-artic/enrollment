import { LegalGuardianEnum, StudentModel } from '@enrollment/data-models';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginateRaw,
  Pagination,
} from 'nestjs-typeorm-paginate';
import {
  Connection,
  EntityManager,
  Transaction,
  TransactionManager,
} from 'typeorm';
import { Person } from '../entities/configuration/person.entity';
import { Student } from '../entities/enrollment/student.entity';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(
    @TransactionManager() private manager: EntityManager,
    @InjectRepository(StudentRepository)
    private readonly studentRepository: StudentRepository,
    private readonly logger: Logger,
    private connection: Connection
  ) {
    logger.setContext(StudentService.name);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Student>> {
    const queryBuilder = this.studentRepository.createQueryBuilder('student');
    queryBuilder.leftJoinAndSelect('student.student', 'person');
    queryBuilder.leftJoinAndSelect('student.grade', 'grade');
    queryBuilder
      .leftJoinAndSelect('person.identificationTypes', 'identificationType')
      .leftJoinAndSelect('person.gender', 'gender')
      .select([
        'student.id as id',
        'identificationType.name as identification_type',
        'person.identification as identification',
        'gender.name as gender',
        'person.phone as phone',
        'grade.name as grade',
      ])
      .addSelect(
        "CONCAT(person.firstName, ' ', person.secondName, ' ',  person.firstSurname, ' ', person.secondSurname)",
        'name'
      );
    queryBuilder.orderBy('person.firstName', 'DESC');
    return paginateRaw(queryBuilder, options);
  }

  @Transaction()
  async saveEnrollment(studentModel: StudentModel) {
    try {
      const student: Student = this.studentRepository.create();

      // Save student person.
      studentModel.student = await this.manager
        .getRepository(Person)
        .save(studentModel.student);

      console.log(1);

      student.studentId = studentModel.student.id;

      // Save father person.
      studentModel.father = await this.manager
        .getRepository(Person)
        .save(studentModel.father);
      student.fatherId = studentModel.father.id;

      console.log(2);

      // Save mother person.
      studentModel.mother = await this.manager
        .getRepository(Person)
        .save(studentModel.mother);
      student.motherId = studentModel.mother.id;

      console.log(3);

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

      console.log(4);

      await this.manager.getRepository(Student).save(student);
      studentModel.id = student.id;

      console.log(5);
    } catch (error) {
      console.log(error);
    }

    return studentModel;
  }

  async saveEnrollment2(studentModel: StudentModel): Promise<StudentModel> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { student, father, mother, legalGuardian } = studentModel;

      const studentEntity: Student = this.studentRepository.create();

      // Save student person.
      studentModel.student = await queryRunner.manager
        .getRepository(Person)
        .save(student);
      studentEntity.studentId = studentModel.student.id;

      // Save father person.
      studentModel.father = await queryRunner.manager
        .getRepository(Person)
        .save(father);
      studentEntity.fatherId = studentModel.father.id;

      // Save mother person.
      studentModel.mother = await queryRunner.manager
        .getRepository(Person)
        .save(mother);
      studentEntity.motherId = studentModel.mother.id;

      switch (studentModel.typeLegalGuardian) {
        case LegalGuardianEnum.OTHER:
          studentModel.legalGuardian = await queryRunner.manager
            .getRepository(Person)
            .save(legalGuardian);
          studentEntity.legalGuardianId = studentModel.legalGuardian.id;
          break;
        case LegalGuardianEnum.FATHER:
          studentEntity.legalGuardianId = studentModel.father.id;
          break;
        case LegalGuardianEnum.MOTHER:
          studentEntity.legalGuardianId = studentModel.mother.id;
          break;
        default:
          studentEntity.legalGuardianId = studentModel.mother.id;
          break;
      }

      studentEntity.year = studentModel.year;
      studentEntity.gradeId = studentModel.grade;
      studentEntity.enrollmentNumber = studentModel.enrollmentNumber;
      studentEntity.sheetNumber = studentModel.sheetNumber;

      await queryRunner.manager.save(studentEntity);
      studentModel.id = studentEntity.id;

      await queryRunner.commitTransaction();
      return studentModel;
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}
