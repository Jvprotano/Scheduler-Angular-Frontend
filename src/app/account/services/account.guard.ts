import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageUtils } from '../../utils/localstorage';

export const accountGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const localStorage = inject(LocalStorageUtils);

  // const service = inject(AccountService)

  if (localStorage.getUserToken()) {
    console.log("entrou aqui")
    router.navigate(['/home']);
    return false;
  }

  return true;

  // if (true) {
  //   return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?');
  // }
};
