import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { catchError, map, throwError } from "rxjs";
import { environment } from "../../environments/environment.development";
import { LocalStorageUtils } from "../utils/localstorage";
import { inject } from "@angular/core";

export class BaseService {

    protected httpClient: HttpClient;

    constructor() {
        this.httpClient = inject(HttpClient);
    }
    protected UrlServiceV1: string = environment.apiUrl;
    public LocalStorage = new LocalStorageUtils();

    protected GetHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    }

    protected GetAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.LocalStorage.getUserToken()}`
            })
        }
    }

    protected get(route: string, authenticated: boolean = true) {
        return this.httpClient.get(`${this.UrlServiceV1}${route}`, authenticated ? this.GetAuthHeaderJson() : this.GetHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }
    protected post(route: string, data: any, authenticated: boolean = true) {
        return this.httpClient.post(`${this.UrlServiceV1}${route}`, data, authenticated ? this.GetAuthHeaderJson() : this.GetHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }
    protected put(route: string, data: any, authenticated: boolean = true) {
        return this.httpClient.put(`${this.UrlServiceV1}${route}`, data, authenticated ? this.GetAuthHeaderJson() : this.GetHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    protected extractData(response: any) {
        return response.data || {};
    }

    protected serviceError(response: HttpErrorResponse) {
        let customErrorMessage: string;

        if (!response)
            customErrorMessage = "Erro ao processar a requisição, por favor tente novamente mais tarde";
        else
            switch (response.status) {
                case 400:
                    customErrorMessage = 'Dados incorretos ou inválidos';
                    break;
                case 401:
                    customErrorMessage = 'Você não está autorizado a acessar este recurso';
                    break;
                case 403:
                    customErrorMessage = 'Você não tem permissão para acessar este recurso';
                    break;
                case 404:
                    customErrorMessage = 'Opção não encontrada, por favor tente novamente mais tarde';
                    break;
                case 500:
                    customErrorMessage = 'Ocorreu um erro interno no servidor, por favor tente novamente mais tarde';
                    break;
                default:
                    customErrorMessage = 'Erro ao processar a requisição, por favor tente novamente mais tarde';
                    break;
            }

        return throwError(() => new HttpErrorResponse({
            ...response,
            error: customErrorMessage,
            url: response?.url || undefined
        }));
    }
}