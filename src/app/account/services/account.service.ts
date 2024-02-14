import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../../user/models/user";
import { BaseService } from "../../services/base.service";
import { Observable, catchError, delay, map, of } from "rxjs";
import { Login } from "../models/login";

@Injectable()
export class AccountService extends BaseService {

  constructor(private http: HttpClient) { super(http) }

  registerUser(user: User): Observable<User> {
    let response = this.http.post(this.UrlServiceV1 + 'register', user, this.GetHeaderJson())
      .pipe(
        map(this.extractData),
        catchError((error: any) => {
          this.serviceError(error);
          return error(error);
        })
      );

    return response;
  }

  login(user: Login): Observable<any> {

    return this.post('login', user);

    // return of({
    //   userToken: {
    //     "id": 1,
    //     "email": "teste@atrono.com"
    //   },
    //   accessToken: '12345',
    // }).pipe(delay(3000));

    // let response = this.http.post(this.UrlServiceV1 + 'login', user, this.GetHeaderJson())
    //     .pipe(
    //         map(this.extractData),
    //         catchError((error: any) => {
    //             this.serviceError(error);
    //             return error(error);
    //         })
    //     );

    // return response;
  }
}
