import { Professional } from "../../scheduling/models/professional";
import { ServiceOffered } from "../../scheduling/models/service_offered";

export interface Company {
    id: string,
    name: string,
    description: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    status: number,
    scheduleStatus: number,
    schedulingUrl: string,
    servicesOffered: ServiceOffered[],
    employeers: Professional[]
}