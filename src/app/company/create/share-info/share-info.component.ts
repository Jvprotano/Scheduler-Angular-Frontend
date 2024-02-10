import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-share-info',
  standalone: true,
  imports: [],
  templateUrl: './share-info.component.html',
  styleUrl: './share-info.component.css'
})
export class ShareInfoComponent {
  @Input() data: any;
  @Output() previous: EventEmitter<any> = new EventEmitter();

  onPrevious() {
    this.previous.emit();
  }
}