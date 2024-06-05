import { Observable } from "rxjs";
import { BaseService } from "../../services/base.service";
import { AppUser } from "../models/user";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService extends BaseService {

    constructor() { super() }

    getProfile(): Observable<AppUser> {
        return this.get('user', true);
    }

    updateUser(user: AppUser): Observable<AppUser> {
        return this.put('user', user, true);
    }
}