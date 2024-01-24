import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    BrowserAnimationsModule,
    // CustomFormsModule
  ],
  providers: []
})
export class AccountModule { }
