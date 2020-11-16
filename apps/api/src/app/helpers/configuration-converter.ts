import { ListModel } from '@enrollment/data-models';
import { List } from './../entities/configuration/list.entity';

export class ConfigurationConverter {
  static toList(listModel: ListModel, update: boolean): List {
    const list: List = new List();
    console.log('actualizar ' + update + ' converter ' + listModel);
    console.log(listModel);
    if (update) {
      list.id = listModel.id;
    }
    if (listModel.parent !== undefined && listModel.parent.id) {
      list.parent = new List();
      list.parent.id = listModel.parent.id;
    }
    list.description = listModel.description;
    return list;
  }
}
