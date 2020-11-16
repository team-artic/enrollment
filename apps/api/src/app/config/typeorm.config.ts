import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { List } from '../entities/configuration/list.entity';
import { Location } from '../entities/configuration/location.entity';
import { Person } from '../entities/configuration/person.entity';
import { Student } from '../entities/enrollment/student.entity';
import { CustomNamingStrategy } from './custom-naming.strategy';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'Enrollment',
  synchronize: true,
  logging: 'all',
  namingStrategy: new CustomNamingStrategy(),
  entities: [List, Location, Person, Student],
};
