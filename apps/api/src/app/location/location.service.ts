import { GetLocationModel } from '@enrollment/data-models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './../entities/configuration/location.entity';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationRepository)
    private readonly locationRepository: LocationRepository
  ) {}

  async getLocationParent(parentId: number): Promise<GetLocationModel[]> {
    const locations: GetLocationModel[] = [];
    const parent: Location = new Location();
    parent.id = parentId;
    const listLocations: Location[] = await this.locationRepository.findTrees();
    console.log(listLocations);

    listLocations.forEach((item) => {
      const obj: GetLocationModel = new GetLocationModel();
      obj.id = item.id;
      if (item.parent) {
        const objParent: GetLocationModel = new GetLocationModel();
        objParent.id = item.parent.id;
        objParent.name = item.parent.name;
        obj.parent = objParent;
      }
      obj.name = item.name;
      locations.push(obj);
    });

    return locations;
  }
}
