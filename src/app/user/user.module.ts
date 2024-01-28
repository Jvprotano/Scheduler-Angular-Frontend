import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyModule } from '../company/company.module';
import { CompaniesComponent } from './companies/companies.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CompanyModule,
    CompaniesComponent
  ],
})
export class UserModule { }
