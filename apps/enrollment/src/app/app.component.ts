import { Component } from '@angular/core';
import { StudentModel } from '@enrollment/data-models';

@Component({
  selector: 'enrollment-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'enrollment';

  console($event: StudentModel) {
    console.log($event);
  }
}
