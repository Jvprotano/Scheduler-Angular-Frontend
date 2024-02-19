import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinantialComponent } from './finantial.component';

describe('FinantialComponent', () => {
  let component: FinantialComponent;
  let fixture: ComponentFixture<FinantialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinantialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinantialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
