import { GetListModel } from './get-list.model';

export class ListModel {
  id: number;
  parent: GetListModel;
  code: string;
  name: string;
}
