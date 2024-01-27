import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  providers: [MatDatepickerModule],
  imports: [
    CommonModule,
    CreateComponent,
    EditComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModalModule,
  ],
})
export class CompanyModule { }
