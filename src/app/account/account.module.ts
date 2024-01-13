import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { CustomFormsModule } from 'ngx-custom-validators';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterComponent,
    LoginComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // CustomFormsModule
  ],
  providers: []
})
export class AccountModule { }
