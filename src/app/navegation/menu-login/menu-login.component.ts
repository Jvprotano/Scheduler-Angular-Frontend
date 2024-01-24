import { Component } from '@angular/core';
import { LocalStorageUtils } from '../../utils/localstorage';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


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
  email: string = "";
  localStorageUtils = new LocalStorageUtils();


  constructor(private router: Router) { }


  loggedUser(): boolean {
    this.token = this.localStorageUtils.getUserToken();
    this.user = this.localStorageUtils.getUser();

    if (this.user)
      this.email = this.user.email;

    return this.token != null;
  }

  logout() {
    this.localStorageUtils.clearUserLocalData();
    this.router.navigate(['/home']);
  }

}
