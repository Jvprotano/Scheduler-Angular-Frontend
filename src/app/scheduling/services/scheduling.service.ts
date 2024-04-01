import { Injectable } from "@angular/core";
import { BaseService } from "../../services/base.service";
import { Scheduling } from "../models/scheduling";

@Injectable()
export class SchedulingService extends BaseService{
    
    getServices() {
        return this.get('services');
    }
    
    getProfessionals() {
        return this.get('professionals');
    }
    
    getAvailableTimes(date: string, professionalId: string, companyId: string, serviceId: string) {
        return this.get(`scheduling/getavailabletimeslots?date=${date}&professionalId=${professionalId}&companyId=${companyId}&serviceId=${serviceId}`);
    }
    
    schedule(scheduling: Scheduling) {
        return this.post('scheduling', scheduling);
    }
}