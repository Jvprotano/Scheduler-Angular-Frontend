import { Component, Output, EventEmitter } from '@angular/core';
import { StringUtils } from '../../../utils/string-utils';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-basic-info',
  standalone: true,
  imports: [CommonModule],
  providers: [LocationService],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.css'
})
export class BasicInfoComponent {
  @Output() next: EventEmitter<any> = new EventEmitter();

  name: string = '';
  cnpj: string = '';
  email: string = '';
  image: string = '';
  isPhysicalCompany: boolean = false;
  cep: string = '';

  constructor(private locationService: LocationService) { }


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