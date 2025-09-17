import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulingComponent } from './scheduling.component';
import { SuccessComponent } from './success/success.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'success', component: SuccessComponent },
  { path: ':id', component: SchedulingComponent }
];

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    SchedulingComponent,
    SuccessComponent
  ]
})
export class SchedulingModule { }