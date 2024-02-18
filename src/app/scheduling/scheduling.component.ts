import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './scheduling.component.html',
  styleUrl: './scheduling.component.css'
})
export class SchedulingComponent {

  serviceSelected?: Service;
  professionalSelected?: Professional;
  dateSelected: string = '';
  times: string[] = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  timeSelected: string = '';
  name: string = 'Empresa do Vitão';
  lastName: string = '';
  phone: string = '';
  email: string = '';

  atualizarProfissionais() {
  }


  selecionarProfissional(professional: any) {
    if (this.professionalSelected == professional) {
      this.professionalSelected = undefined;
    } else {
      this.professionalSelected = professional;
    }
  }
  selectService(service: any) {
    if (this.serviceSelected == service) {
      this.serviceSelected = undefined;
      return;
    }
    this.serviceSelected = service;
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