import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-business-sector',
  standalone: true,
  imports: [],
  templateUrl: './business-sector.component.html',
  styleUrl: './business-sector.component.css'
})
export class BusinessSectorComponent {

  @Input() data: any;
  @Output() previous: EventEmitter<any> = new EventEmitter();
  @Output() next: EventEmitter<any> = new EventEmitter();

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
