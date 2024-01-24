import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { LocalStorageUtils } from '../utils/localstorage';
import { Router } from "@angular/router"; // Import the correct Router

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private localStorageUtils: LocalStorageUtils, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 400) {
                        throw error.error;
                    }
                    if (error.status === 401) { // não sei quem está logado
                        this.localStorageUtils.clearUserLocalData();
                        this.router.navigate(['/account/login']);
                        throw error.error;
                    }
                    if (error.status === 403) { // sei quem é, mas não pode acessar
                        this.router.navigate(['/access-denied']);
                    }
                    if (error.status === 404) {
                        throw error.error;
                    }
                    if (error.status === 500) {
                        throw error.error;
                    }
                }
                return throwError(() => new Error(error));
            })
        );
    }
}
