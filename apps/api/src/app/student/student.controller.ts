import { StudentModel } from '@enrollment/data-models';
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(
    private readonly logger: Logger,
    private readonly studentService: StudentService
  ) {
    this.logger.setContext(StudentController.name);
  }

  @Post()
  saveEnrollment(@Body() enrollment: StudentModel): Promise<StudentModel> {
    this.logger.verbose(`Save enrollment data ${JSON.stringify(enrollment)}`);
    return this.studentService.saveEnrollment(enrollment);
  }
}
