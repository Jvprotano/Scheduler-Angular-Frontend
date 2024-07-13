import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DisplayMessage } from '../../utils/generic-form-validation';
import { AccountService } from '../services/account.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Login } from '../models/login';
import { RedirectService } from '../../services/redirect.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { delay } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [AccountService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = new FormGroup({});
  user!: Login;
  name: string = "";
  errors = [];
  displayMessage: DisplayMessage = {};
  formSubmited: boolean = false;
  textInterval: any;
  @ViewChild('textLogin') textLogin!: HTMLElement;
  isDisabledLogin: boolean = false;
  isDisabledGuest: boolean = false;
  isScheduling: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private accountService: AccountService,
    private eventService: EventService,
    private redirectService: RedirectService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

    this.isScheduling = this.redirectService.getReturnRoute()?.includes('scheduling') ?? false;

    this.eventService.broadcast('hide-header', true);

    this.loginForm = this.fb.group({
      emailOrPhone: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
    // this.changeLoginText();
  }

  get form() {
    return this.loginForm.controls;
  }

  guestLogin(){
    this.isDisabledGuest = true;
    
    this.modalService.dismissAll();
  }

  login() {
    debugger
    this.formSubmited = true;
    this.isDisabledLogin = true;

    if (this.loginForm.valid) {
      this.user = Object.assign({}, this.user, this.loginForm.value);

      this.accountService.login(this.user).subscribe({
        next: (result) => {
          this.success(result);
          this.formSubmited = false,
            this.isDisabledLogin = false;
        }, error: err => { this.errorResponse(err) }
      })

    } else {
      this.isDisabledLogin = false;
      // this.formSubmited = false
    }

  }

  success(result: any) {

    this.isDisabledLogin = false;
    this.errors = [];

    if (!this.isScheduling) {
      this.router.navigate(['/home']).then(() => {
        this.toastr.success('Login realizado com sucesso!', 'Bem vindo!!!', { positionClass: 'toast-top-center' });
      })
    }

    this.modalService.dismissAll();
  }
  errorResponse(err: any) {

    this.isDisabledLogin = false;
    this.toastr.error(err.error, 'Ops! :(');
  }

  ngOnDestroy(): void {
    this.eventService.broadcast('hide-header', false);
    // if (this.textInterval) {
    //   clearInterval(this.textInterval);
    // }
  }
}
