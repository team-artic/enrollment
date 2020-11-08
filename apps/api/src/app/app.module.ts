import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListModule } from './list/list.module';
import { PersonModule } from './person/person.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [ListModule, PersonModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
