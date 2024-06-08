import { Observable } from "rxjs";
import { BaseService } from "../../services/base.service";
import { Company } from "../models/company";

export class CompanyService extends BaseService {

    getAllByUserId(userId: string): Observable<Company> {
        return this.get('company/getByUserId/' + userId, true);
    }
    getById(id: string): Observable<Company> {
        return this.get(`company/${id}`);
    }
    checkUrlIsValid(id: string | "", url : string) : boolean{
         this.get(`company/checkurlisvalid/${url}/${id}`).subscribe({
            next: (result) => {
                debugger
              return result === true
            } 
          });

          return false;
    }
}
