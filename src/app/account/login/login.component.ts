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
  isDisabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private accountService: AccountService,
    private eventService: EventService,
  ) { }

  ngOnInit() {

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

  login() {
    this.formSubmited = true;
    this.isDisabled = true;

    if (this.loginForm.valid) {
      this.user = Object.assign({}, this.user, this.loginForm.value);

      // Forma de usar o error no subscribe
      // this.serve.login(this.user).subscribe({ next: (result) => { result.token }, error: err => { } })

      this.accountService.login(this.user).subscribe({
        next: (result) => {
          this.success(result);
          this.formSubmited = false,
            this.isDisabled = false;
        }, error: err => { this.errorResponse(err) }
      })

      // this.accountService.login(this.user).subscribe(
      //   result => {
      //     this.success(result);
      //     this.formSubmited = false,
      //       this.isDisabled = false;
      //   },
      //   // error => { this.fail(error) }
      // );
      
    } else {
      this.isDisabled = false;
      // this.formSubmited = false
    }

  }

  success(result: any) {
    this.isDisabled = false;
    this.errors = [];
    this.accountService.LocalStorage.saveUserLocalData(result);

    this.router.navigate(['/home']).then(() => {
      let toast = this.toastr.success('Login realizado com sucesso!', 'Bem vindo!!!', { positionClass: 'toast-top-center' });

      // if (toast) {
      //   toast.onHidden.subscribe(() => {
      //     // Additional logic after toast is hidden
      //   });
      // }
    })

  }
  errorResponse(err: any) {
    debugger;
    this.isDisabled = false;
    this.toastr.error(err.message, 'Ops! :(');
  }

  ngOnDestroy(): void {
    this.eventService.broadcast('hide-header', false);
    // if (this.textInterval) {
    //   clearInterval(this.textInterval);
    // }
  }
}
