import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CreateComponent } from '../user/companies/create/create.component';

@NgModule({
  declarations: [],
  providers: [MatDatepickerModule],
  imports: [CreateComponent],
  exports: [CreateComponent]
})
export class CompanyModule { }
