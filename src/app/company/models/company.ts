import { Professional } from "../../scheduling/models/professional";
import { ServiceOffered } from "../../scheduling/models/service_offered";
import { DaySchedule } from "./business-hours";

export interface Company {
    id: string,
    name: string,
    image: string,
    description: string,
    phone: string,
    status: number,
    scheduleStatus: ScheduleStatus,
    schedulingUrl: string,
    servicesOffered: ServiceOffered[],
    employeers: Professional[],
    schedule: DaySchedule[],
}

export const enum ScheduleStatus {
    OPEN = 1,
    CLOSED = 2,
    MAINTENANCE = 3
}