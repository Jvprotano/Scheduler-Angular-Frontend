import { Component } from '@angular/core';
import { LocalStorageUtils } from '../../utils/localstorage';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../account/services/account.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-menu-login',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbDropdownModule],
  templateUrl: './menu-login.component.html',
  styleUrl: './menu-login.component.css'
})
export class MenuLoginComponent {

  token: string | null = "";
  user: any;
  localStorageUtils = new LocalStorageUtils();
  isLoggedIn$: Observable<boolean>;

  constructor(private router: Router, private accountService: AccountService) { 
    this.isLoggedIn$ = this.accountService.userIsLogged;
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/home']);
  }
}
