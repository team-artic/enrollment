import { List } from './../entities/configuration/list.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(List)
export class ListRepository extends Repository<List> {
  async getListsParent(parentId: number): Promise<List[]> {
    return await this.find({
      where: {
        parentId,
      },
    });
  }
}
