import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SchedulingService } from './services/scheduling.service';
import { Scheduling } from './services/models/scheduling';

@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.css'
})
export class SchedulingComponent implements OnInit {
  serviceSelected?: Service;
  professionalSelected?: Professional;
  times: string[] = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  timeSelected: string = '';
  companyName: string = '';

  schedulingForm!: FormGroup;
  Scheduling!: Scheduling;

  constructor(private fb: FormBuilder, private schedulingService: SchedulingService, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.schedulingForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      email: [''],
      service: [''],
      professional: [''],
      dateSelected: ['', Validators.required],
      timeSelected: [''],
    });

    this.companyName = 'Salão de Beleza da Kaila';
  }

  countSteps = 1;

  atualizarProfissionais() {
  }

  checkProfessionalAndServiceAreSelected() {
    if (this.serviceSelected && this.professionalSelected) {
      const continueButton = document.getElementById('continueButton');
      if (continueButton) {
        continueButton.scrollIntoView({ behavior: 'smooth' });
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
  }

  agendar() {
    this.Scheduling = Object.assign({}, this.Scheduling, this.schedulingForm.value);

    this.schedulingService.schedule(this.Scheduling).subscribe({
      next: (result) => {
        this.processarSucesso(result);
      }, error: err => { this.processarFalha(err) }
    })
  }

  processarFalha(response: any) {
    if (response.error)
      this.toastr.error(response.error, 'Opa :(');
    else
      this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  processarSucesso(response: any) {
    
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
    return this.schedulingForm.get('dateSelected')?.value;
  }

  services: Service[] = [
    {
      name: 'Corte de Cabelo',
      description: 'Corte de Cabelo na tesoura e na máquina',
      price: 50.00
    },
    {
      name: 'Manicure',
      description: 'Unhas das mãos e dos pés',
      price: 30.00
    },
    {
      name: 'Consulta Psicológica',
      description: 'Consulta com psicólogo(a) para tratamento de problemas emocionais e psicológicos',
      price: 100.00
    }
  ];
  profissionais: Professional[] = [
    {
      name: 'João',
      description: 'Cabeleireiro'
    },
    {
      name: 'Maria',
      description: 'Manicure'
    },
    {
      name: 'José',
      description: 'Psicólogo'
    },
    {
      name: 'Ana',
      description: 'Psicóloga'
    },
    {
      name: 'Pedro',
      description: 'Cabeleireiro'
    },
    {
      name: 'Paula',
      description: 'Manicure'
    }
  ];
}

interface Service {
  name: string;
  description: string;
  price: number;
  // professionals: Professional[];
}
interface Professional {
  name: string;
  description: string;
  // schedule: Schedule[];
}