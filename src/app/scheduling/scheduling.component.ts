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

  serviceSelected!: Service;
  professionalSelected!: Professional;  
  dateSelected: string = '';
  times: string[] = [];
  timeSelected: string = '';
  name: string = 'Empresa do Vitão';
  lastName: string = '';
  phone: string = '';
  email: string = '';

  atualizarProfissionais() {
  }


  selecionarProfissional(professional : any) {
    this.professionalSelected = professional;
  }
  selectService(service : any) {
    this.serviceSelected = service;
  }

  atualizarHorarios() {
  }

  agendar() {
  }

  services: Service[] = [
    {
      name: 'Corte de Cabelo',
      description: 'Corte de Cabelo na tesoura e na máquina',
      price: 50
    },
    {
      name: 'Manicure',
      description: 'Unhas das mãos e dos pés',
      price: 30
    },
    {
      name: 'Consulta Psicológica',
      description: 'Consulta com psicólogo(a) para tratamento de problemas emocionais e psicológicos',
      price: 100
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