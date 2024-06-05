import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppUser } from "../../user/models/user";
import { BaseService } from "../../services/base.service";
import { BehaviorSubject, Observable, catchError, delay, map, of, tap } from "rxjs";
import { Login } from "../models/login";
import { LocalStorageUtils } from "../../utils/localstorage";
import { StringUtils } from '../../utils/string-utils';

@Injectable()
export class AccountService extends BaseService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private localStorageUtils: LocalStorageUtils) {
    super();
    this.loggedIn.next(!StringUtils.isNullOrEmpty(this.localStorageUtils.getUserToken() ?? ""));
  }

  registerUser(user: AppUser): Observable<AppUser> {
    return this.post('register', user);
  }

  get userIsLoggedObs() {
    this.loggedIn.next(!StringUtils.isNullOrEmpty(this.localStorageUtils.getUserToken() ?? ""));
    return this.loggedIn.asObservable();
  }

  isLoggedUser() : boolean{
    return !StringUtils.isNullOrEmpty(this.localStorageUtils.getUserToken() ?? "") 
      && StringUtils.isNullOrEmpty(this.localStorageUtils.getUser() ?? "")
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
  
  fakeLogin(){ // TODO: REMOVE
    this.localStorageUtils.saveUserToken("token");
    this.localStorageUtils.saveUser("user");
  }
}
