import { ListModel } from '@enrollment/data-models';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './../entities/configuration/list.entity';
import { ConfigurationConverter } from './../helpers/configuration-converter';
import { ListRepository } from './list.repository';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListRepository)
    private readonly listRepository: ListRepository,
    private readonly logger: Logger
  ) {
    logger.setContext(ListService.name);
  }

  async getLists(): Promise<List[]> {
    const query = this.listRepository.find();
    return await query;
  }

  getListsParent(parentId: number): Promise<List[]> {
    return this.listRepository.getListsParent(parentId);
  }

  save(listModel: ListModel) {
    this.logger.log('Save list.');
    const list = this.listRepository.create();
    const listConverted = ConfigurationConverter.toList(
      listModel,
      listModel.id !== undefined && listModel.id !== 0
    );
    const saveEntity = { ...list, ...listConverted };
    this.listRepository.save(saveEntity);
  }
}
