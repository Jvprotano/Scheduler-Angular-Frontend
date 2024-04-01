import { Observable } from "rxjs";

export interface Company {
    id: number,
    name: string,
    description: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    status: number,
    openSchedule: boolean
}