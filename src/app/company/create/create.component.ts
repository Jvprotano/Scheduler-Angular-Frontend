import { Component, Input, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationService } from '../services/location.service';
import { HttpClientModule } from '@angular/common/http';
import { StringUtils } from '../../utils/string-utils';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { Company } from '../models/company';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create',
  standalone: true,
  providers: [LocationService],
  imports: [ReactiveFormsModule, HttpClientModule, NgxSpinnerModule, CommonModule, FormsModule, NgbModalModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  createForm!: FormGroup;
  @Input() companyToEdit!: Company;

  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private locationService: LocationService
  ) {

    /**
     * Ao invés de iniciar o form aqui, você pode criar uma função e chamá-la no onInit,
     * assim você consegue preencher com os dados que vem do Input() companyToEdit
     * ou preencher como null (quando for create)
     * Exemplo no OnInit
     */

    // this.createForm = this.fb.group({
    //   cep: ['', Validators.required],
    //   city: [''],
    //   street: [''],
    //   state: [''],
    //   neighborhood: [''],
    //   complement: [''],
    //   number: [''],
    //   isPhysicalCompany: true,
    //   image: [''],
    //   cnpj: [''],
    //   name: [''],
    //   email: [''],
    // });
  }

  ngOnInit(): void {
    this.openModal();
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    /**
     * Inicializa o form com os dados
     */
    this.initFormValidation(this.companyToEdit);
  }

  initFormValidation(company: Company | null) {
    // Se preencher os dados com ? após o "company" significa que caso não exista aquele valor, será null
    this.createForm = this.fb.group({
      cep: [company?.zip, Validators.required],
      city: [company?.city],
      street: [company?.address],
      state: [company?.state],
      neighborhood: [''],
      complement: [''],
      number: [''],
      isPhysicalCompany: [true],
      image: [''],
      cnpj: [''],
      name: [company?.name],
      email: [company?.email],
    });
  }

  /**
   * Tentar manter o OnInit como primeira função, na hora de corrigir algo vai ser mais fácil pra analisar o ciclo de execução
   */
  openModal() {
    this.modalService.open(this.modalContent, { size: 'lg' });
  }

  /**
   * Incluir os serviços no constructor é uma boa prática e garante que você tem acesso ao serviço em todo o componente
   */
  // locationService = inject(LocationService);


  searchCEP(): void {
    var cep = this.createForm.get('cep')?.value;

    cep = StringUtils.onlyNumbers(cep);

    if (cep?.length !== 8) {
      return;
    }

    this.locationService.obterDadosCep(cep).subscribe(
      (dados: any) => this.updateForm(dados),
      // (error: any) => console.error('Erro ao obter dados do CEP', error)
    );
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.createForm.patchValue({
          image: reader.result as string
        });
      };
    }
  }

  hasImage(): boolean {
    return !StringUtils.isNullOrEmpty(this.createForm.get('image')?.value);
  }

  removeImage(): void {
    this.createForm.patchValue({
      image: ''
    });
  }

  updateForm(dados: any): void {
    this.createForm.patchValue({
      city: dados.localidade,
      street: dados.logradouro,
      state: dados.uf,
      neighborhood: dados.bairro,
    });
  }

  onSubmit(): void {
    console.log('submit');
    // Lógica para enviar dados do formulário para o backend
  }
}
