import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../../../company/services/location.service';
import { StringUtils } from '../../../../utils/string-utils';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CompanyService } from '../../../../company/services/company.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
  ],
  providers: [LocationService, provideNgxMask(), CompanyService],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.css',
})
export class BasicInfoComponent implements OnInit {
  @Output() next: EventEmitter<any> = new EventEmitter();

  @Input() form!: FormGroup;
  name: string = '';
  cnpj: string = '';
  email: string = '';
  image: string = '';

  prefix!: string;
  urlToCheck!: string;
  urlErrorMessage: string | undefined;
  urlSuccessMessage: string | undefined;

  constructor(
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    console.log(this.form);
    this.prefix = 'agende.com/';

    // this.form.controls['name'].setValue('abc');
  }

  onNext() {
    if (!this.form.valid) {
      return;
    }

    const data = {
      nme: this.name,
      cnpj: this.cnpj,
      image: this.image,
    };
    this.next.emit(data);
  }

  hasImage(): boolean {
    return !StringUtils.isNullOrEmpty(this.image);
  }

  removeImage(): void {
    this.image = '';
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.image = reader.result as string;

        this.form.patchValue({
          image: this.image,
        });
      };
    }
  }

  updateForm(dados: any): void {
    // this.createForm.patchValue({
    //   city: dados.localidade,
    //   street: dados.logradouro,
    //   state: dados.uf,
    //   neighborhood: dados.bairro,
    // });
  }

  checkUrlIsValid() {
    this.urlErrorMessage = undefined;
    this.urlSuccessMessage = undefined;

    this.urlToCheck = this.form.get('schedulingUrl')?.value;

    if (this.urlToCheck.length <= 2) {
      this.urlErrorMessage = 'Url deve ter ao menos 3 caracteres';
      return;
    }

    this.companyService.checkUrlIsValid('', this.urlToCheck).subscribe({
      next: (result: boolean) => {
        if (result === true) this.urlSuccessMessage = 'Url válido.';
        else this.urlErrorMessage = 'Url inválido ou já utilizado.';
      },
      error(err) {
        console.log(err);
        return false;
      },
    });
  }
}
