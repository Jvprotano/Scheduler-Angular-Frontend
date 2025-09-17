import { Routes } from '@angular/router';
import { HomeComponent } from './navegation/home/home.component';
import { NotFoundComponent } from './navegation/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'scheduling',
        loadChildren: () => import('./scheduling/scheduling.module').then(m => m.SchedulingModule)
    },
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
    },
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
        path: 'company',
        loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent }
];

