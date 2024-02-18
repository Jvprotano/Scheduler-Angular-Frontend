import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EventColor } from 'calendar-utils';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg, Draggable } from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-schedule',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    SidebarComponent
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MatNativeDateModule }
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {

  @ViewChild('modalContent') content: any;
  upcomingEvents: any[] = [];
  events: any[] = [
    { start: new Date(), end: new Date().setHours(new Date().getHours() + 1), title: 'Agendamento', color: 'yellow' }
  ];
  eventTypes: any[] = [];
  selectedDay = null;
  calendarOptions!: CalendarOptions;
  eventToEdit: any;
  subscriptions: Subscription = new Subscription();
  menuToggle: boolean = false;
  cal!: Calendar;
  selectedEvent: any;
  modalTitle: any;
  diffDays: number = 0;
  submitted: boolean = false;
  eventForm!: FormGroup;
  isRangeValid = true;

  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
    this.initCalendar();
  }

  initCalendar() {
    let draggableEl: any = document.getElementById('external-events');

    new Draggable(draggableEl, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        console.log(eventEl);
        return {
          title: eventEl.innerText
        };
      }
    });

    this.calendarOptions = {
      locales: allLocales,
      locale: 'pt-br',
      timeZone: 'local',
      editable: true,
      droppable: true,
      selectable: true,
      navLinks: true,
      initialView: this.getInitialView(),
      themeSystem: 'bootstrap',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      buttonText: {
        'day': 'Diário',
        'month': 'Mensal',
        'today': 'Hoje',
        'week': 'Semanal',
        'list': 'Lista'
      },
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
      dayMaxEventRows: 3,
      dayPopoverFormat: { month: 'long', day: 'numeric', year: 'numeric' },
      windowResize: (view: any) => {
        var newView = this.getInitialView();
        this.cal.changeView(newView);
      },
      eventClick: (info: any) => {
        console.log(info);
        // this.eventClick(info);
      },
      dateClick: (info: any) => {

        let currentTime = info.date.getTime();
        let start = new Date(currentTime + 8 * 60 * 60 * 1000);
        let end = new Date(start.getTime() + 1 * 60 * 60 * 1000);

        let newEvent = {
          id: null,
          eventType: null,
          title: null,
          start: start,
          end: end,
          //className: info.event.classNames[0]
        };

        this.selectedEvent = newEvent;
        this.addEvent();
      },
      events: this.events,
      // eventColor: 'yellow',
      eventDrop: (info: any) => {
        let indexOfSelectedEvent = this.events.findIndex(function (x: any) {
          return x.id == info.event.id
        });

        if (this.events[indexOfSelectedEvent]) {

        }
      }
    };
    const el = document.getElementById('calendar');
    this.cal = new Calendar(el!, this.calendarOptions);
    this.cal.render();
  }

  addEvent() {
    this.submitted = false;
    this.initFormValidation(this.selectedEvent);
    this.modal.open(this.content, { centered: true });
  }

  initFormValidation(event: any) {

  }

  getInitialView() {
    if (window.innerWidth >= 768 && window.innerWidth < 1200) {
      return 'timeGridWeek';
    } else if (window.innerWidth <= 768) {
      return 'listMonth';
    } else {
      return 'dayGridMonth';
    }
  }

}
