import { Injectable } from "@angular/core";
import { BaseService } from "../../services/base.service";
import { Scheduling } from "./models/scheduling";

@Injectable()
export class SchedulingService extends BaseService{
    
    getServices() {
        return this.get('services');
    }
    
    getProfessionals() {
        return this.get('professionals');
    }
    
    getAvailableTimes(date: string, professionalId: string) {
        return this.get(`available-times?date=${date}&professionalId=${professionalId}`);
    }
    
    schedule(scheduling: Scheduling) {
        return this.post('scheduling', scheduling);
    }
}