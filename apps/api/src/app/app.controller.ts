import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ListService } from './list/list.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly listServve: ListService
  ) {}

  @Get()
  getData() {
    return this.listServve.getListsParent(3);
  }
}
