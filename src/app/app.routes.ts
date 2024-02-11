import { Routes } from '@angular/router';
import { HomeComponent } from './navegation/home/home.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { NotFoundComponent } from './navegation/not-found/not-found.component';
import { AccountAppComponent } from './account/account-app.component';
import { UserComponent } from './user/user.component';
import { CompaniesComponent } from './user/companies/companies.component';
// import { EditComponent } from './company/edit/edit.component';
// import { CreateComponent } from './company/create/create.component';
import { ScheduleComponent } from './company/schedule/schedule.component';
import { CompanyComponent } from './company/company.component';
import { accountGuard } from './account/services/account.guard';
import { ProfileComponent } from './user/profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'account', component: AccountAppComponent, children: [
            { path: 'login', component: LoginComponent, canActivate: [accountGuard] },
            { path: 'register', component: RegisterComponent, canActivate: [accountGuard] },
        ]
    },
    {
        path: 'user', component: UserComponent, children: [
            { path: 'companies', component: CompaniesComponent },
            { path: 'profile', component: ProfileComponent }
        ]
    },
    {
        path: 'company', component: CompanyComponent, children: [
            // { path: 'new', component: CreateComponent },
            // { path: 'edit', component: EditComponent },
            // { path: 'edit/:id', component: EditComponent },
            { path: ':id/schedule', component: ScheduleComponent }
        ]
    },

    { path: '**', component: NotFoundComponent },
    { path: 'not-found', component: NotFoundComponent },
];

