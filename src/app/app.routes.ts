import { Routes } from '@angular/router';
import { HomeComponent } from './navegation/home/home.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { NotFoundComponent } from './navegation/not-found/not-found.component';
import { AccountAppComponent } from './account/account-app.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'account', component: AccountAppComponent, children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
        ]
    },
    { path: '**', component: NotFoundComponent },
    { path: 'not-found', component: NotFoundComponent },
];

