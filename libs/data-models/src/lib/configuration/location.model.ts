import { GetLocationModel } from './get-location.model';

export class LocationModel {
  id!: number;
  parent!: GetLocationModel;
  typeLocationId!: number;
  code!: string;
  name!: string;
  active!: boolean;
}
