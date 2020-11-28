import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListRepository } from './list.repository';
import { ListService } from './list.service';
import { ListController } from './list.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ListRepository])],
  providers: [ListService, Logger],
  exports: [ListService],
  controllers: [ListController],
})
export class ListModule {}
