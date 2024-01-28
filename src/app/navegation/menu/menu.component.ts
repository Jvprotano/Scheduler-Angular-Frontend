import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { MenuLoginComponent } from "../menu-login/menu-login.component";
import { Observable, Subscription, fromEvent } from 'rxjs';
import { CommonModule } from '@angular/common';

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

  ngOnInit(): void {

    this.checkScreenSize();

    if (typeof window !== 'undefined') {

      this.resizeObservable$ = fromEvent(window, 'resize');

      this.resizeSubscription$ = this.resizeObservable$.subscribe((event) => {
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
