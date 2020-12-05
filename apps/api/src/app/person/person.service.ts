import { PersonModel, StudentModel } from '@enrollment/data-models';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonRepository } from './person.repository';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonRepository)
    private personRepository: PersonRepository,
    private logger: Logger
  ) {
    logger.setContext(PersonService.name);
  }

  async savePerson(personModel: PersonModel): Promise<PersonModel> {
    this.logger.log('Save list.');
    const person = this.personRepository.create();

    const saveEntity = { ...person, ...personModel };
    const savePerson = await this.personRepository.save(saveEntity);
    personModel.id = savePerson.id;

    return personModel;
  }
}
