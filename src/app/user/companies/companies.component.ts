import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { Company, ScheduleStatus } from '../../company/models/company';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from './create/create.component';
import { CompanyService } from '../../company/services/company.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    CreateComponent,
    NgbDropdownModule,
  ],
  providers: [CompanyService],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    // load companies into an array so template and methods can access them synchronously
    this.companyService
      .getAll()
      .pipe(take(1))
      .subscribe({
        next: (companies) => {
          this.companies = companies;
        },
        error: (err) => {
          console.error('Error fetching companies:', err);
        },
      });
  }

  companyToEdit!: Company;
  clickedEdit: boolean = false;

  // array used by template and component methods
  companies: Company[] = [];

  scheduleOpen: boolean = true;

  shareLink(item: any) {
    const link = `http://yourwebsite.com/company/${item.id}`;
    window.prompt('Copy to clipboard: Ctrl+C, Enter', link);
  }

  openCloseSchedule(id: string) {
    const company = this.companies.find((c) => c.id === id);
    if (company) {
      company.scheduleStatus =
        company.scheduleStatus == ScheduleStatus.CLOSED
          ? ScheduleStatus.OPEN
          : ScheduleStatus.CLOSED;
    }
  }

  deleteCompany(id: string) {
    const company = this.companies.find((c) => c.id === id);
    if (company) {
      company.status = 0;
    }
  }

  activeCompany(id: string) {
    const company = this.companies.find((c) => c.id === id);
    if (company) {
      company.status = 1;
    }
  }

  editCompany(company: Company | null) {
    if (company) this.companyToEdit = company;
    this.clickedEdit = true;
    this.setTimeout();
  }
  createCompany() {
    this.clickedEdit = true;
    this.setTimeout();
  }

  setTimeout() {
    setTimeout(() => {
      this.clickedEdit = false;
    }, 1000);
  }
}
