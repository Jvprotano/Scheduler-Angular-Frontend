import { Injectable } from "@angular/core";
import { BaseService } from "../../services/base.service";
import { Observable } from "rxjs";
import { Scheduling } from "../models/scheduling";
import { ServiceOffered } from "../models/service_offered";

@Injectable()
export class SchedulingService extends BaseService {
    
    getServices(): Observable<ServiceOffered[]> {
        return this.get<ServiceOffered[]>('services');
    }
    
    getAvailableTimes(date: string, professionalId: string, companyId: string, serviceId: string): Observable<string[]> {
        return this.get<string[]>(`scheduling/getavailabletimeslots?date=${date}&professionalId=${professionalId}&companyId=${companyId}&serviceId=${serviceId}`);
    }
    
    schedule(scheduling: Scheduling): Observable<any> {
        return this.post('scheduling', scheduling);
    }
}