import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyModule } from '../company/company.module';
import { AccountModule } from '../account/account.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CompanyModule,
    AccountModule
  ]
})
export class UserModule { }
