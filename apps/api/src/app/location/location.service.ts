import { GetLocationModel } from '@enrollment/data-models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw } from 'typeorm';
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
    const listLocations: Location[] = await this.locationRepository.find({
      where: [{ parentId: parentId }],
      relations: ['locations'],
    });
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

  async getAutocompleteLocation(
    filter: string,
    typeId: number
  ): Promise<GetLocationModel[]> {
    const locations: GetLocationModel[] = [];
    const listLocations: Location[] = await this.locationRepository.find({
      where: [
        {
          name: Raw((name) => `${name} ILIKE '%${filter}%'`),
          typeLocationId: typeId,
        },
      ],
      relations: ['parent'],
      order: {
        name: 'ASC',
      },
      take: 5,
    });
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
