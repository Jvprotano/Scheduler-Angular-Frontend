import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessSectorComponent } from './business-sector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('BusinessSectorComponent', () => {
  let component: BusinessSectorComponent;
  let fixture: ComponentFixture<BusinessSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BusinessSectorComponent,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatIconModule,
        MatTooltipModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with 7 days', () => {
    const scheduleArray = component.getScheduleControls();
    expect(scheduleArray.length).toBe(7);
  });

  it('should toggle intervals when day is enabled/disabled', () => {
    const dayIndex = 0;
    
    // Enable day
    component.onDayToggle(dayIndex, true);
    expect(component.getIntervals(dayIndex).length).toBe(1);

    // Disable day
    component.onDayToggle(dayIndex, false);
    expect(component.getIntervals(dayIndex).length).toBe(0);
  });

  it('should add and remove intervals', () => {
    const dayIndex = 0;
    component.onDayToggle(dayIndex, true);
    
    // Add interval
    component.addInterval(dayIndex);
    expect(component.getIntervals(dayIndex).length).toBe(2);

    // Remove interval
    component.removeInterval(dayIndex, 1);
    expect(component.getIntervals(dayIndex).length).toBe(1);
  });

  it('should validate overlapping intervals', () => {
    const dayIndex = 0;
    component.onDayToggle(dayIndex, true);
    
    const intervals = component.getIntervals(dayIndex);
    intervals.at(0).patchValue({ start: '09:00', end: '17:00' });
    
    // Add overlapping interval
    component.addInterval(dayIndex);
    intervals.at(1).patchValue({ start: '16:00', end: '18:00' });
    
    expect(component.validateIntervals(dayIndex)).toBeFalse();
  });

  it('should validate non-overlapping intervals', () => {
    const dayIndex = 0;
    component.onDayToggle(dayIndex, true);
    
    const intervals = component.getIntervals(dayIndex);
    intervals.at(0).patchValue({ start: '09:00', end: '12:00' });
    
    // Add non-overlapping interval
    component.addInterval(dayIndex);
    intervals.at(1).patchValue({ start: '13:00', end: '17:00' });
    
    expect(component.validateIntervals(dayIndex)).toBeTrue();
  });

  it('should generate time options in 30-minute intervals', () => {
    expect(component.timeOptions.length).toBe(48); // 24 hours * 2 (30-min intervals)
    expect(component.timeOptions[0]).toBe('00:00');
    expect(component.timeOptions[1]).toBe('00:30');
    expect(component.timeOptions[47]).toBe('23:30');
  });

  it('should emit previous event when onPrevious is called', () => {
    spyOn(component.previous, 'emit');
    component.onPrevious();
    expect(component.previous.emit).toHaveBeenCalled();
  });

  it('should emit next event with valid schedule when form is submitted', () => {
    spyOn(component.next, 'emit');
    
    // Set up a valid schedule
    const dayIndex = 0;
    component.onDayToggle(dayIndex, true);
    const intervals = component.getIntervals(dayIndex);
    intervals.at(0).patchValue({ start: '09:00', end: '17:00' });

    component.onSubmit();
    
    expect(component.next.emit).toHaveBeenCalled();
    const emittedValue = (component.next.emit as jasmine.Spy).calls.first().args[0];
    expect(emittedValue.schedule[0].isOpen).toBeTrue();
    expect(emittedValue.schedule[0].intervals.length).toBe(1);
  });
});
