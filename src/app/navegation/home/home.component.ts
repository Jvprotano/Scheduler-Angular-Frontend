import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const options = {
        strings: ['Simplifique a forma em que seus clientes agendam seus serviços, enquanto você disponibiliza de uma plataforma de gestão completa.'],
        typeSpeed: 30,
        backSpeed: 0,
        loop: false
      };

      const typed = new Typed('#typed', options);
    }
  }

}
