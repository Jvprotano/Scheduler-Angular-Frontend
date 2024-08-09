import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  private returnRoute: string | null = null;

  constructor(private router: Router) {}

  setReturnRoute(route: string): void {
    this.returnRoute = route;
  }

  getReturnRoute(): string | null {
    return this.returnRoute;
  }

  redirectToReturnRoute(): void {
    if (this.returnRoute) {
      this.router.navigateByUrl(this.returnRoute);
    } else {
      // Caso não haja uma rota guardada, redirecione para a rota padrão do agendamento
      this.router.navigate(['/gpt-agenda']);
    }
  }
}
