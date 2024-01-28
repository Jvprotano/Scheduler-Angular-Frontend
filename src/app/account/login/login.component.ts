import { CommonModule } from '@angular/common';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { DisplayMessage } from '../../utils/generic-form-validation';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';
import { FormBuilder, FormGroup, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [AccountService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router) { }
  loginForm: FormGroup = new FormGroup({});

  user!: User;
  name: string = "";

  serve = inject(AccountService);

  errors = [];
  displayMessage: DisplayMessage = {};

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  login() {
    this.user = Object.assign({}, this.user, this.loginForm.value);
    console.log("entrou ação login")
    console.log(this.user)

    // Forma de usar o error no subscribe
    // this.serve.login(this.user).subscribe({ next: (result) => { result.token }, error: err => { } })

    this.serve.login(this.user).subscribe(
      result => { this.success(result) },
      // error => { this.fail(error) }
    );
  }

  success(result: any) {
    this.errors = [];
    this.serve.LocalStorage.saveUserLocalData(result);

    this.router.navigate(['/home']).then(() => {
      let toast = this.toastr.success('Login realizado com sucesso!', 'Bem vindo!!!');

      if (toast) {
        toast.onHidden.subscribe(() => {
          // Additional logic after toast is hidden
        });
      }
    })

  }
}
