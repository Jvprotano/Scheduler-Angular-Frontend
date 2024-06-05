import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { MenuLoginComponent } from "../menu-login/menu-login.component";
import { Observable, Subscription, debounceTime, fromEvent } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { AccountService } from '../../account/services/account.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  imports: [NgbCollapse, RouterModule, MenuLoginComponent, CommonModule]
})
export class MenuComponent implements OnInit {

  public isCollapsed: boolean = true;
  mobile: boolean = false;
  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;
  hideHeader: boolean = false;
  isLoggedIn$: Observable<boolean>;

  constructor(private eventService: EventService, private accountService : AccountService) { 
    this.isLoggedIn$ = this.accountService.userIsLoggedObs;
  }

  ngOnInit(): void {
    this.checkScreenSize();
    
    this.eventService.subscribe('hide-header', value => this.hideHeader = value);

    if (typeof window !== 'undefined') {

      this.resizeObservable$ = fromEvent(window, 'resize');

      this.resizeSubscription$ = this.resizeObservable$.pipe(debounceTime(300)).subscribe((event) => {
        if (event?.isTrusted) {
          this.checkScreenSize(event.target);
        } else {
          this.checkScreenSize();
        }
      });
    }
  }

  checkScreenSize(event: any = null) {
    let width: any;
    if (event === null) {
      if (typeof window !== 'undefined') {
        width = window.innerWidth;
      }
    } else {
      if (typeof window !== 'undefined') {
        width = event.outerWidth;
      }
    };
    this.mobile = width > 480 ? false : true;
  }
}
