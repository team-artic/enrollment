import { Person } from './../entities/configuration/person.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {
  async getPersons(): Promise<Person[]> {
    const query = this.createQueryBuilder('person');
    return await query.getMany();
  }
}
