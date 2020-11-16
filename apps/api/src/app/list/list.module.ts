import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListRepository } from './list.repository';
import { ListService } from './list.service';

@Module({
  imports: [TypeOrmModule.forFeature([ListRepository])],
  providers: [ListService, Logger],
  exports: [ListService],
})
export class ListModule {}
