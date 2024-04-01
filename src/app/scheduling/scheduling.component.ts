import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { SchedulingService } from './services/scheduling.service';
import { Scheduling } from './models/scheduling';
import { Professional } from './models/professional';
import { ServiceOffered } from './models/service_offered';


import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CompanyService } from '../company/services/company.service';

@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxSpinnerModule],
  providers: [SchedulingService, CompanyService],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.css'
})
export class SchedulingComponent implements OnInit {
  serviceSelected?: ServiceOffered;
  professionalSelected?: Professional;
  times: string[] = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  timeSelected: string = '';
  companyName: string = '';

  schedulingForm!: FormGroup;
  Scheduling!: Scheduling;

  companyId: string = '';

  constructor(private fb: FormBuilder, private schedulingService: SchedulingService,
    private companyService: CompanyService,
    private toastr: ToastrService, private router: Router, private route: ActivatedRoute,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {

    this.spinner.show();

    this.companyId = this.route.snapshot.params['id'];

    console.log("empresaa")
    console.log(this.companyId)

    this.companyService.getById(this.companyId).subscribe({
      next: (result) => {
        this.companyName = result.name
      }, error: () => this.toastr.error('Empresa não encontrada!')
    })

    // Gets ao iniciar
    // this.services = this.schedulingService.getServices();
    // this.profissionais = this.schedulingService.getProfessionals();

    this.schedulingForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      email: [''],
      date: ['', Validators.required],
      professionalId: [''],
      serviceId: [''],
      time: [''],
    });

    this.companyName = 'Salão de Beleza da Kaila';

    this.spinner.hide();
  }

  countSteps = 1;

  atualizarProfissionais() {
  }

  checkProfessionalAndServiceAreSelected() {
    if (this.serviceSelected && this.professionalSelected) {
      const continueButton = document.getElementById('continueButton');
      if (continueButton) {
        continueButton.scrollIntoView({ behavior: 'smooth' });
        this.schedulingForm.get('professionalId')?.setValue(this.professionalSelected.id);
        this.schedulingForm.get('serviceId')?.setValue(this.serviceSelected.id);
      }
    }
  }


  selecionarProfissional(professional: any) {
    if (this.professionalSelected == professional) {
      this.professionalSelected = undefined;
      return;
    }

    this.professionalSelected = professional;
    this.checkProfessionalAndServiceAreSelected();
  }
  selectService(service: any) {
    if (this.serviceSelected == service) {
      this.serviceSelected = undefined;
      return;
    }
    this.serviceSelected = service;
    this.checkProfessionalAndServiceAreSelected();
  }
  selectTime(time: any) {
    if (this.timeSelected == time) {
      this.timeSelected = '';
      return;
    }
    this.timeSelected = time;
  }

  atualizarHorarios() {
    let date = this.schedulingForm.get('date')?.value;

    // this.schedulingService.getAvailableTimes(date, this.professionalSelected?.id ?? '', this.companyId, this.serviceSelected?.id ?? '')
    // .subscribe({
    //   next: (result) => {
    //     this.times = result;
    //   }, error: () => { this.toastr.error('Erro ao obter os horários disponíveis') }
    // });
  }

  agendar() {

    this.schedulingForm.patchValue({
      professionalId: this.professionalSelected?.id,
      serviceId: this.serviceSelected?.id,
      time: this.timeSelected,
    });

    this.Scheduling = Object.assign({}, this.schedulingForm.value);

    this.schedulingService.schedule(this.Scheduling).subscribe({
      next: (result) => {
        this.processarSucesso();
      }, error: err => { this.processarFalha(err) }
    })
  }

  processarFalha(response: any) {
    if (response.error)
      this.toastr.error(response.error, 'Opa :(');
    else
      this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  processarSucesso() {

    this.router.navigate(['scheduling/success']).then(() => {
      this.toastr.success('Agendamento realizado com sucesso!', 'Você será notificado em breve com informações sobre o agendamento.');
    })
  }

  goToNextStep() {
    this.countSteps++;
  }

  goToPreviousStep() {
    this.countSteps--;
  }

  hasDateSelected(): boolean {
    return this.schedulingForm.get('date')?.value;
  }

  services: ServiceOffered[] = [
    {
      id: '1',
      name: 'Corte de Cabelo',
      description: 'Corte de Cabelo na tesoura e na máquina',
      price: 50.00
    },
    {
      id: '2',
      name: 'Manicure',
      description: 'Unhas das mãos e dos pés',
      price: 30.00
    },
    {
      id: '3',
      name: 'Consulta Psicológica',
      description: 'Consulta com psicólogo(a) para tratamento de problemas emocionais e psicológicos',
      price: 100.00
    }
  ];
  profissionais: Professional[] = [
    {
      id: '1',
      name: 'João',
      description: 'Cabeleireiro'
    },
    {
      id: '2',
      name: 'Maria',
      description: 'Manicure'
    },
    {
      id: '3',
      name: 'José',
      description: 'Psicólogo'
    },
    {
      id: '4',
      name: 'Ana',
      description: 'Psicóloga'
    },
    {
      id: '5',
      name: 'Pedro',
      description: 'Cabeleireiro'
    },
    {
      id: '6',
      name: 'Paula',
      description: 'Manicure'
    }
  ];
}