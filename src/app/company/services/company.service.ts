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
    checkUrlIsValid(id: string | "", url : string) : boolean{
        let formatUrl = `company/checkurlisvalid?${!StringUtils.isNullOrEmpty(url)? `schedulingUrl=${url}` : ''}${!StringUtils.isNullOrEmpty(id) ? `&id=${id}` : ''}`
        debugger
         this.get(formatUrl)
                  .subscribe({
            next: (result: boolean) => {
                this.extractDataUrlIsValid(result)
            },
            error(err) {
                debugger
            }, 
          });
        //  .pipe(
        //     map(this.extractDataUrlIsValid),
        //     catchError(this.serviceError)
        // );
         

        debugger
          return false;
    }
    protected extractDataUrlIsValid(response: boolean) {
        debugger
        return response === true;
    }
}
