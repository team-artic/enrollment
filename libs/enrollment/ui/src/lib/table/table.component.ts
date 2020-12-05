import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StudentService } from '@enrollment/data-access';
import { GetStudentModel } from '@enrollment/data-models';
import { DetailGridInfo, GridApi } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'enrollment-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  private gridApi: GridApi | undefined;

  data: Observable<GetStudentModel[]>;

  columnDefs = [
    { field: 'identificationType' },
    { field: 'identification' },
    { field: 'name' },
    { field: 'gender' },
    { field: 'phone' },
    { field: 'grade' },
  ];

  constructor(private studentService: StudentService) {
    this.data = this.studentService.getStudents().pipe(map((x) => x.items));
  }

  onGridReady(params: DetailGridInfo) {
    this.gridApi = params.api;
    this.gridApi?.sizeColumnsToFit();
  }
}
