import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, inject, NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DisplayMessage } from '../../utils/generic-form-validation';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';
import { FormBuilder, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';

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
  user!: User;
  name: string = "";
  // serve = inject(AccountService);
  errors = [];
  displayMessage: DisplayMessage = {};
  formSubmited: boolean = false;
  textInterval: any;
  @ViewChild('textLogin') textLogin!: HTMLElement;
  isDisabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private accountService: AccountService,
    private eventService: EventService,
    // @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {

    this.eventService.broadcast('hide-header', true);

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    // this.changeLoginText();
  }

  changeLoginText() {
    // const text: any = this.document?.getElementById('login-text');
    // const texts = {
    //   '1': 'Simplifique',
    //   '2': 'Modernize',
    //   '3': 'Agende',
    // };
    // if (text) {

    //   setTimeout(() => {
    //     text.textContent = texts[1];
    //   }, 0);
    //   setTimeout(() => {
    //     text.textContent = texts[2];
    //   }, 4000);
    //   setTimeout(() => {
    //     text.textContent = texts[3];
    //   }, 8000);

    //   this.textInterval = setInterval(() => {
    //     setTimeout(() => {
    //       text.textContent = texts[1];
    //     }, 0);
    //     setTimeout(() => {
    //       text.textContent = texts[2];
    //     }, 4000);
    //     setTimeout(() => {
    //       text.textContent = texts[3];
    //     }, 8000);
    //   }, 12000);
    // }
  }

  get form() {
    return this.loginForm.controls;
  }

  login() {
    this.formSubmited = true;
    this.isDisabled = true;
    if (this.loginForm.valid) {
      this.user = Object.assign({}, this.user, this.loginForm.value);

      // Forma de usar o error no subscribe
      // this.serve.login(this.user).subscribe({ next: (result) => { result.token }, error: err => { } })

      this.accountService.login(this.user).subscribe(
        result => {
          this.success(result); this.formSubmited = false,
            this.isDisabled = false;
        },
        // error => { this.fail(error) }
      );
    } else {
      this.isDisabled = false;
      // this.formSubmited = false
    }

  }

  success(result: any) {
    this.errors = [];
    this.accountService.LocalStorage.saveUserLocalData(result);

    this.router.navigate(['/home']).then(() => {
      let toast = this.toastr.success('Login realizado com sucesso!', 'Bem vindo!!!');

      if (toast) {
        toast.onHidden.subscribe(() => {
          // Additional logic after toast is hidden
        });
      }
    })

  }

  ngOnDestroy(): void {
    this.eventService.broadcast('hide-header', false);
    // if (this.textInterval) {
    //   clearInterval(this.textInterval);
    // }
  }
}
