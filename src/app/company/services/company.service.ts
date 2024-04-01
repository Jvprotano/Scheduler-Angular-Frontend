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
}
