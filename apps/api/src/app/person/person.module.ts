import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonRepository } from './person.repository';
import { PersonService } from './person.service';

@Module({
  imports: [TypeOrmModule.forFeature([PersonRepository])],
  providers: [PersonService, Logger],
  exports: [PersonService],
})
export class PersonModule {}
