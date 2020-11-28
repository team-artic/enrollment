import { Controller, Get, Logger, ParseIntPipe, Param } from '@nestjs/common';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
  constructor(
    private readonly logger: Logger,
    private readonly ListService: ListService
  ) {
    this.logger.setContext(ListController.name);
  }

  @Get('/:type')
  getListByType(@Param('type', new ParseIntPipe()) type: number) {
    return this.ListService.getListByType(type);
  }
}
