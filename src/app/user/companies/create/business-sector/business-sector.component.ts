import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';

@Component({
  selector: 'app-business-sector',
  standalone: true,
  imports: [NgSelectModule, FlatpickrModule, CommonModule, ReactiveFormsModule],
  providers: [FlatpickrDefaults],
  templateUrl: './business-sector.component.html',
  styleUrl: './business-sector.component.css'
})

export class BusinessSectorComponent implements OnInit {
  @Input() form!: FormGroup;
  @Output() previous: EventEmitter<any> = new EventEmitter();
  @Output() next: EventEmitter<any> = new EventEmitter();

  weekdays: any[] = [
    { id: 1, day: 'Segunda-feira', checked: true, intervals: [{ start: '', end: '' }] },
    { id: 2, day: 'Terça-feira', checked: true, intervals: [{ start: '', end: '' }] },
    { id: 3, day: 'Quarta-feira', checked: true, intervals: [{ start: '', end: '' }] },
    { id: 4, day: 'Quinta-feira', checked: true, intervals: [{ start: '', end: '' }] },
    { id: 5, day: 'Sexta-feira', checked: true, intervals: [{ start: '', end: '' }] },
    { id: 6, day: 'Sábado', checked: false, intervals: [{ start: '', end: '' }] },
    { id: 7, day: 'Domingo', checked: false, intervals: [{ start: '', end: '' }] },
  ]

  dayNames = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicializa o formulário com um FormArray para os dias da semana
    this.form = this.fb.group({
      weekdays: new FormArray(
        [
          new FormControl(null), 
          new FormControl(null), 
          new FormControl(null),
          new FormControl(null),
          new FormControl(null),
          new FormControl(null),
          new FormControl(null),
        ]),
    });
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

  onSubmit(): void {
    console.log(this.form.value);
    console.log(this.weekdays);
  }
}
