import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../../../company/services/location.service';
import { StringUtils } from '../../../../utils/string-utils';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [LocationService, provideNgxMask()],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.css'
})
export class BasicInfoComponent implements OnInit {
  @Output() next: EventEmitter<any> = new EventEmitter();

  @Input() form!: FormGroup;
  name: string = '';
  cnpj: string = '';
  email: string = '';
  image: string = '';
  isPhysicalCompany: boolean = false;
  cep: string = '';

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    console.log(this.form);
    // this.form.controls['name'].setValue('abc');
  }

  onCheckboxChange() {
    this.isPhysicalCompany = !this.isPhysicalCompany;
  }

  onNext() {
    // Validar os campos do formulário, se necessário

    // Emitir evento para informar ao componente pai que a primeira etapa foi concluída

    const data = {
      nme: this.name,
      cnpj: this.cnpj,
      email: this.email,
      image: this.image,
      isPhysicalCompany: this.isPhysicalCompany
    };
    this.next.emit(data);
  }

  hasImage(): boolean {
    return !StringUtils.isNullOrEmpty(this.image);
  }

  removeImage(): void {
    this.image = ""
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.image = reader.result as string
      };
    }
  }

  searchCEP(): void {
    var cep = this.cep;

    cep = StringUtils.onlyNumbers(cep);

    if (cep?.length !== 8) {
      return;
    }

    this.locationService.obterDadosCep(cep).subscribe(
      (dados: any) => this.updateForm(dados),
    );
  }
  updateForm(dados: any): void {
    // this.createForm.patchValue({
    //   city: dados.localidade,
    //   street: dados.logradouro,
    //   state: dados.uf,
    //   neighborhood: dados.bairro,
    // });
  }

}
