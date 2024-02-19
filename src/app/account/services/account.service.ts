import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../../user/models/user";
import { BaseService } from "../../services/base.service";
import { BehaviorSubject, Observable, catchError, delay, map, of, tap } from "rxjs";
import { Login } from "../models/login";
import { LocalStorageUtils } from "../../utils/localstorage";
import { StringUtils } from '../../utils/string-utils';
import { debug } from "console";

@Injectable()
export class AccountService extends BaseService {

  // localStorageUtils = new LocalStorageUtils();
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private localStorageUtils: LocalStorageUtils) {
    super(http);
    this.loggedIn.next(!StringUtils.isNullOrEmpty(this.localStorageUtils.getUserToken() ?? ""));
  }


  // private loggedIn = new BehaviorSubject<boolean>(!StringUtils.isNullOrEmpty(this.localStorageUtils.getUserToken() ?? ""));

  registerUser(user: User): Observable<User> {
    return this.post('register', user);
  }

  get userIsLogged() {
    this.loggedIn.next(!StringUtils.isNullOrEmpty(this.localStorageUtils.getUserToken() ?? ""));
    return this.loggedIn.asObservable();
  }

  login(user: Login): Observable<any> {
    return this.post('login', user).pipe(
      tap(response => {
        if (response) {
          this.localStorageUtils.saveUserLocalData(response);
          this.loggedIn.next(true);
        }
      })
    );
  }
  logout() {
    this.localStorageUtils.clearUserLocalData();
    this.loggedIn.next(false);
  }
}
