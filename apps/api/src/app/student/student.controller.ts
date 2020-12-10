import { StudentModel } from '@enrollment/data-models';
import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Student } from '../entities/enrollment/student.entity';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(
    private readonly logger: Logger,
    private readonly studentService: StudentService
  ) {
    this.logger.setContext(StudentController.name);
  }

  @Get()
  async getStudents(
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<Pagination<Student>> {
    limit = 1000;
    return this.studentService.paginate({
      page,
      limit,
      route: 'http://enrollment.com/students',
    });
  }

  @Post()
  saveEnrollment(@Body() enrollment: StudentModel): Promise<StudentModel> {
    this.logger.verbose(`Save enrollment data ${JSON.stringify(enrollment)}`);
    return this.studentService.saveEnrollment2(enrollment);
  }
}
