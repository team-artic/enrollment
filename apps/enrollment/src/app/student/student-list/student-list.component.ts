import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'enrollment-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
