import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { Company } from '../../company/models/company';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent {

  companies: Company[] = [{
    id: 0,
    name: 'Cartucho',
    description: 'Melhor restaurante do vale',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    status: 1,
    openSchedule: true,
  },
  {
    id: 1,
    name: 'Conciflex',
    description: 'Conciliadora de cartões',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    status: 1,
    openSchedule: true,
  },
  {
    id: 2,
    name: 'Ponta',
    description: 'Soluções para o Agronegócio',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    status: 1,
    openSchedule: true,
  }];


  scheduleOpen: boolean = true;

  shareLink(item: any) {
    const link = `http://yourwebsite.com/company/${item.id}`;
    window.prompt('Copy to clipboard: Ctrl+C, Enter', link);
  }

  openCloseSchedule(id: number) {
    const company = this.companies.find(c => c.id === id);
    if (company) {
      // altere o valor de openSchedule na lista de companies
      company.openSchedule = !company.openSchedule;
    }
    console.log(this.companies)
  }

  deleteCompany(id: number) {
    const company = this.companies.find(c => c.id === id);
    if (company) {
      company.status = 0;
    }
  }
  activeCompany(id: number) {
    const company = this.companies.find(c => c.id === id);
    if (company) {
      company.status = 1;
    }
  }

}
