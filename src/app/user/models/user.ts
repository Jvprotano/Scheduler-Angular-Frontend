export interface User {
    id?: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    birthDate?: Date,
    password: string,
    confirmPassword: string,
    imageBase64?: string,
    imageUrl?: string 
}