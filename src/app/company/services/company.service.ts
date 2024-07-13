import { Observable, catchError, map } from "rxjs";
import { BaseService } from "../../services/base.service";
import { Company } from "../models/company";
import { error } from "console";
import { StringUtils } from "../../utils/string-utils";
import { response } from "express";

export class CompanyService extends BaseService {

    getAllByUserId(userId: string): Observable<Company> {
        return this.get('company/getByUserId/' + userId, true);
    }
    getById(id: string): Observable<Company> {
        return this.get(`company/${id}`);
    }
    checkUrlIsValid(id: string | "", url: string): Observable<boolean> {
        let formatUrl = `company/checkurlisvalid?${!StringUtils.isNullOrEmpty(url) ? `schedulingUrl=${url}` : ''}${!StringUtils.isNullOrEmpty(id) ? `&id=${id}` : ''}`
        return this.get(formatUrl);
    }
    protected extractDataUrlIsValid(response: boolean) {
        debugger
        let isValid = response === true;
        return isValid;
    }
}
