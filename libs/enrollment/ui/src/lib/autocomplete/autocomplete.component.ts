import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { AutocompleteModel } from './autocomplete.model';

@Component({
  selector: 'enrollment-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit {
  @Input() data: Observable<AutocompleteModel[]> = of([]);
  @Output() selectedValue = new EventEmitter<AutocompleteModel>();
  @Input() control!: FormControl;
  @Input() placeholder = '';

  constructor() {
    // ..
  }

  ngOnInit(): void {
    // ..
  }

  selected(selected: MatAutocompleteSelectedEvent) {
    this.selectedValue.emit(selected.option.value);
  }

  displayName(item: AutocompleteModel) {
    return item ? item.name : '';
  }
}
