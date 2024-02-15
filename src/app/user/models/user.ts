export interface User {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    birthDate?: Date,
    password: string,
    confirmPassword: string,
}