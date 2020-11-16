import { GetListModel } from './get-list.model';

export class ListModel {
  id: number;
  parent: GetListModel;
  description: string;
}
