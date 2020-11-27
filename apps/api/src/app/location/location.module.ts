import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './location.controller';
import { LocationRepository } from './location.repository';
import { LocationService } from './location.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocationRepository])],
  providers: [LocationService, Logger],
  controllers: [LocationController],
})
export class LocationModule {}
