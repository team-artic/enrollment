import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetLocationModel } from '@enrollment/data-models';
import { environment } from '@enrollment/enviroments';

@Injectable()
export class LocationService {
  private locationUrl = `${environment.apiUrl}/locations`;

  constructor(private httpClient: HttpClient) {}

  autocompleteMunicipality(filter: string): Observable<GetLocationModel[]> {
    return this.httpClient.get<GetLocationModel[]>(
      `${this.locationUrl}/municipality/${filter}`
    );
  }

  autocompleteNeighborhood(filter: string): Observable<GetLocationModel[]> {
    return this.httpClient.get<GetLocationModel[]>(
      `${this.locationUrl}/neigborhood/${filter}`
    );
  }
}
