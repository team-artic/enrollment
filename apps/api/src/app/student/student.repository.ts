import { EntityRepository, Repository } from 'typeorm';
import { Student } from './../entities/enrollment/student.entity';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  async getStudents(): Promise<Student[]> {
    const query = this.createQueryBuilder('stundet');
    return await query.getMany();
  }
}
