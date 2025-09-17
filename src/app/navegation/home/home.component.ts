import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('pt');
    translate.use('pt');
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.get('HOME.DESCRIPTION').subscribe((text: string) => {
        const options = {
          strings: [text],
          typeSpeed: 30,
          backSpeed: 0,
          loop: false
        };

        const typed = new Typed('#typed', options);
      });
    }
  }
}
