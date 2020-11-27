import { GetLocationModel } from '@enrollment/data-models';
import { Controller, Get, Logger, Param, ParseIntPipe } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(
    private readonly logger: Logger,
    private readonly locationService: LocationService
  ) {
    this.logger.setContext(LocationController.name);
  }

  @Get('/:parentId')
  getLocationParent(
    @Param('parentId', ParseIntPipe) parentId: number
  ): Promise<GetLocationModel[]> {
    return this.locationService.getLocationParent(parentId);
  }
}
