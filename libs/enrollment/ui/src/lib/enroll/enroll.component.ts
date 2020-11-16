import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'enrollment-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollComponent implements OnInit {
  enrollForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.enrollForm = this.formBuilder.group({});
  }

  ngOnInit(): void {}
}
