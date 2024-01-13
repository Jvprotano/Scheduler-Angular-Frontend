import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { MenuLoginComponent } from "../menu-login/menu-login.component";

@Component({
    selector: 'app-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css',
    imports: [NgbCollapse, RouterModule, MenuLoginComponent]
})
export class MenuComponent {
  public isCollapsed: boolean = true;
}
