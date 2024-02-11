import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';

@Component({
  selector: 'app-business-sector',
  standalone: true,
  imports: [NgSelectModule, FlatpickrModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [FlatpickrDefaults],
  templateUrl: './business-sector.component.html',
  styleUrl: './business-sector.component.css'
})
export class BusinessSectorComponent implements OnInit {

  @Input() form!: FormGroup;
  @Output() previous: EventEmitter<any> = new EventEmitter();
  @Output() next: EventEmitter<any> = new EventEmitter();
  weekdays: any[] = [
    { id: 1, day: 'Segunda-feira', checked: true },
    { id: 2, day: 'Terça-feira', checked: true },
    { id: 3, day: 'Quarta-feira', checked: true },
    { id: 4, day: 'Quinta-feira', checked: true },
    { id: 5, day: 'Sexta-feira', checked: true },
    { id: 6, day: 'Sábado', checked: false },
    { id: 7, day: 'Domingo', checked: false },
  ]

  ngOnInit(): void {

  }

  onNext() {
    const data = {
      categoria: [1, 2, 3],
      servicos: [1, 2, 3],
    };
    this.next.emit(data);
  }
  onPrevious() {
    this.previous.emit();
  }
}
