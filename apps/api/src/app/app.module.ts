import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { ListModule } from './list/list.module';
import { PersonModule } from './person/person.module';
import { StudentModule } from './student/student.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ListModule,
    PersonModule,
    StudentModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
