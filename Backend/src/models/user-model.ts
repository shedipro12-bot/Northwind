import z, { email } from "zod";
import { Role, StatusCode } from "./enums";
import { ClientError } from "./client-error";

const userSchema = z.object({
    id: z.number().int().positive().optional(),
    firstName: z.string().max(20).min(2),
    lastName: z.string().max(20).min(2),
    email: z.email().min(2).max(16),
    password: z.string().max(16).min(4),
    roleId: z.enum(Role).optional(),
    captchaToken: z.string().max(2000)
});

type iUserModel = z.infer<typeof userSchema>


export class UserModel implements iUserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: number;
    public captchaToken:string;



    public constructor(user: UserModel) {
        this.id = user.id
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
        this.captchaToken = user.captchaToken;
    }
    public validate(): void {
            const result = userSchema.safeParse(this);
            if (!result.success) {
                const message = result.error.issues[0].path + ": " + result.error.issues[0].message
                throw new ClientError(StatusCode.UnprocessableContent,message);
            }
        }
    
    }
    
