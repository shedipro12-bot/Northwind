import { Role } from "./enums";

export type UserModel = {
	id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role; // User / Admin

    captchaToken: string; // ReCAPTCHA
}
