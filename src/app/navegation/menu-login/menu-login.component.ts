import { Component } from '@angular/core';
import { LocalStorageUtils } from '../../utils/localstorage';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../account/services/account.service';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-login',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbDropdownModule, TranslateModule],
  templateUrl: './menu-login.component.html',
  styleUrl: './menu-login.component.css'
})
export class MenuLoginComponent {

  token: string | null = "";
  user: any;
  localStorageUtils = new LocalStorageUtils();
  isLoggedIn$: Observable<boolean>;

  constructor(private router: Router, private accountService: AccountService) { 
    this.isLoggedIn$ = this.accountService.userIsLoggedObs;
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/home']);
  }
}
