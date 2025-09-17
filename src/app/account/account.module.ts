import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountAppComponent } from './account-app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './services/auth.guard';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AccountAppComponent,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [authGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [authGuard] }
    ]
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    AccountAppComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class AccountModule { }