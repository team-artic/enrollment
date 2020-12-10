import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentModel } from '@enrollment/data-models';
import { environment } from '@enrollment/enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private studentUrl = `${environment.apiUrl}/student`;

  constructor(private httpClient: HttpClient) {}

  enroll(studentModel: StudentModel): Observable<StudentModel> {
    return this.httpClient.post<StudentModel>(this.studentUrl, studentModel);
  }

  getStudents() {
    return this.httpClient.get<{ items: any[] }>(`${this.studentUrl}`);
  }
}
