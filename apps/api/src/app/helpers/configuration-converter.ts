import { ListModel, LocationModel, PersonModel } from '@enrollment/data-models';
import { Location } from '../entities/configuration/location.entity';
import { Person } from '../entities/configuration/person.entity';
import { List } from './../entities/configuration/list.entity';

export class ConfigurationConverter {
  static toList(listModel: ListModel, update: boolean): List {
    const list: List = new List();
    if (update) {
      list.id = listModel.id;
    }
    if (listModel.parent !== undefined && listModel.parent.id) {
      list.parent = new List();
      list.parent.id = listModel.parent.id;
    }
    list.code = listModel.code;
    list.name = listModel.name;
    return list;
  }

  static toLocation(locationModel: LocationModel, update: boolean): Location {
    const location: Location = new Location();
    if (update) {
      location.id = locationModel.id;
    }
    return location;
  }

  static toPerson(personModel: PersonModel, update: boolean): Person {
    const person: Person = new Person();
    if (update) {
      person.id = personModel.id;
    }
    return person;
  }
}
