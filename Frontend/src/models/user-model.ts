import { Role } from "./enums";

export type UserModel = {
    id: number
    firstName: string;
    lastName: string;
    email: string;
    password: string | number;
    role: Role // User / Admin

    captchaToken: string; // RECAPTCHA
}
