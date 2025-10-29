import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BusinessSectorComponent } from './business-sector/business-sector.component';
import { LocationService } from '../../../company/services/location.service';
import { Company } from '../../../company/models/company';
import { BasicInfoComponent } from './basic-info/basic-info.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-create',
  standalone: true,
  providers: [LocationService],
  imports: [
    ReactiveFormsModule, 
    HttpClientModule, 
    NgxSpinnerModule, 
    CommonModule,
    FormsModule, 
    NgbModalModule, 
    MatProgressBarModule, 
    BasicInfoComponent, 
    BusinessSectorComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  createForm!: FormGroup;
  @Input() companyToEdit!: Company;

  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  currentStep = 0;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.spinner.show();

    this.openModal();

    this.initFormValidation(this.companyToEdit);
    this.spinner.hide();
  }


  onNextStep(data: any) {
    this.createForm.patchValue(data);
    this.currentStep++;
  }

  onPreviousStep() {
    this.currentStep--;
  }

  initFormValidation(company: Company | null) {
    this.createForm = this.fb.group({
      image: [company?.image],
      cnpj: [''],
      name: [company?.name],
      email: [company?.email],
      schedulingUrl: [company?.schedulingUrl],
      openingHours: [company?.openingHours]
    });
  }

  openModal() {
    this.modalService.open(this.modalContent, { size: 'lg', centered: true });
  }

  onSubmit(): void {
    console.log('submit');
    console.log(this.companyToEdit)
    console.log(this.createForm.value)

    
    // Lógica para enviar dados do formulário para o backend
  }
}
