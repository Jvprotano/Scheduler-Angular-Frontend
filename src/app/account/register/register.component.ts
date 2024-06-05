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

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
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
    private router: Router
    , private toastr: ToastrService
  ) {

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
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
    if (response.error)
      this.toastr.error(response.error, 'Opa :(');
    else
      this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  processarSucesso(response: any) {
    
    this.registerForm.reset();
    this.errors = [];

    // this.accountService.LocalStorage.saveUserLocalData(response);
    // this.router.navigate(['/home'])

    // let toast = this.toastr.success('Registro realizado com Sucesso!', 'Bem vindo!!!'); // Essa é uma mensagem que aparece do lado verde ou vermelha

    // if (toast) { // Adiciona um evento para quando a mensagem sumir, redirecionar para a home
    //   toast.onHidden.subscribe(() => {
    //     this.router.navigate(['/home']);
    //   });
    // }

    // Redirecionar e depois mostrar o toast na tela home
    this.router.navigate(['account/login']).then(() => {
      this.toastr.success('Registro realizado com Sucesso!', 'Bem vindo!!!');
    })
  }
}