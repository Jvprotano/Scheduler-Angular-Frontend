import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { catchError, map, throwError } from "rxjs";
import { environment } from "../../environments/environment.development";
import { LocalStorageUtils } from "../utils/localstorage";

export class BaseService {

    constructor(private httpClient: HttpClient) {

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

    protected get(route: string, authenticated: boolean = false) {
        return this.httpClient.get(`${this.UrlServiceV1}${route}`, authenticated ? this.GetAuthHeaderJson() : this.GetHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }
    protected post(route: string, data: any, authenticated: boolean = false) {
        return this.httpClient.post(`${this.UrlServiceV1}${route}`, data, authenticated ? this.GetAuthHeaderJson() : this.GetHeaderJson())
            .pipe(
                map(this.extractData),
                catchError(this.serviceError)
            );
    }

    protected extractData(response: any) {
        return response.data || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];
        if (response instanceof HttpErrorResponse) {
            if (response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }
        }

        return throwError(() => new Error(response));
    }
}