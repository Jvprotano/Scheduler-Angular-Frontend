import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormControlName, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';
import { AppUser } from '../../user/models/user';
import { AccountService } from '../services/account.service';
import { ValidationMessages, GenericValidator, DisplayMessage } from '../../utils/generic-form-validation';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, TranslateModule],
  providers: [AccountService]
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  errors: any[] = [];

  registerForm!: FormGroup;
  registerUserInfoForm!: FormGroup;
  usuario!: AppUser;
  registerInfoField: boolean = false;

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  unsavedChanges: boolean = true;

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {

    this.validationMessages = {
      email: {
        required: translate.instant('REGISTER.FORM.EMAIL.REQUIRED'),
        email: translate.instant('REGISTER.FORM.EMAIL.INVALID')
      },
      password: {
        required: translate.instant('REGISTER.FORM.PASSWORD.REQUIRED'),
        rangeLength: translate.instant('REGISTER.FORM.PASSWORD.LENGTH')
      },
      confirmPassword: {
        required: translate.instant('REGISTER.FORM.CONFIRM_PASSWORD.REQUIRED'),
        rangeLength: translate.instant('REGISTER.FORM.PASSWORD.LENGTH'),
        equalTo: translate.instant('REGISTER.FORM.CONFIRM_PASSWORD.NOT_MATCHING')
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {


    let passwordValidate = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]);
    let confirmPasswordValidate = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]);

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: passwordValidate,
      confirmPassword: confirmPasswordValidate
    });
    this.registerUserInfoForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.registerForm);
      // this.unsavedChanges = true;
    });

  }

  addAccount() {
    if (this.registerForm.dirty && this.registerForm.valid && this.registerUserInfoForm.valid) {
      
      this.usuario = Object.assign({}, this.usuario, this.registerForm.value);
      this.usuario = Object.assign(this.usuario, this.registerUserInfoForm.value);
      // this.accountService.registerUser(this.usuario)
      //   .subscribe(
      //     sucesso => { this.processarSucesso(sucesso) }
      //     // falha => {this.processarFalha(falha)}
      //   );

      this.accountService.registerUser(this.usuario).subscribe({
        next: (result) => {
          this.processarSucesso(result);
        }, error: err => { this.processarFalha(err) }
      })
    }
  }

  processarFalha(response: any) {
    if (response.error) {
      this.toastr.error(response.error, this.translate.instant('REGISTER.ERRORS.GENERIC'));
    } else {
      this.toastr.error(
        this.translate.instant('REGISTER.ERRORS.UNKNOWN'),
        this.translate.instant('REGISTER.ERRORS.GENERIC')
      );
    }
  }

  processarSucesso(response: any) {
    this.registerForm.reset();
    this.errors = [];

    this.router.navigate(['account/login']).then(() => {
      this.toastr.success(
        this.translate.instant('REGISTER.SUCCESS.MESSAGE'),
        this.translate.instant('REGISTER.SUCCESS.TITLE')
      );
    });
  }
}