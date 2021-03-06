import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetListModel } from '@enrollment/data-models';
import { environment } from '@enrollment/enviroments';
import { Observable } from 'rxjs';

export enum ListTypes {
  IDENTIFICACION_TYPE = 13,
  BLOOD_TYPE = 1,
  GRADE_TYPE = 102,
  GENDER_TYPE = 10,
}

@Injectable()
export class ListService {
  private listUrl = `${environment.apiUrl}/list`;

  constructor(private httpClient: HttpClient) {}

  getIdentificationTypes(): Observable<GetListModel[]> {
    return this.getListByType(ListTypes.IDENTIFICACION_TYPE);
  }

  getBloodTypes(): Observable<GetListModel[]> {
    return this.getListByType(ListTypes.BLOOD_TYPE);
  }

  getGradeType(): Observable<GetListModel[]> {
    return this.getListByType(ListTypes.GRADE_TYPE);
  }

  getGenderType(): Observable<GetListModel[]> {
    return this.getListByType(ListTypes.GENDER_TYPE);
  }

  private getListByType(type: number): Observable<GetListModel[]> {
    return this.httpClient.get<GetListModel[]>(`${this.listUrl}/${type}`);
  }
}
