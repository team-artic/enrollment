import { GetLocationModel } from '@enrollment/data-models';
import { Controller, Get, Logger, Param } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(
    private readonly logger: Logger,
    private readonly locationService: LocationService
  ) {
    this.logger.setContext(LocationController.name);
  }

  @Get('/municipality/:filter')
  getLocationParent(@Param('filter') filter: string): Promise<GetLocationModel[]> {
    return this.locationService.getAutocompleteLocation(filter, 86);
  }
}
