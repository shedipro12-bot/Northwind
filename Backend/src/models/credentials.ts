import { ClientError } from "./client-error";
import { StatusCode } from "./enums";
import { UserModel } from "./user-model";
import z from "zod";
const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().max(16).min(3),
});

export class Credentials {

  public email: string;
  public password: string;




  public constructor(user: UserModel) {
    this.email = user.email;
    this.password = user.password;

  }
  public validate(): void {
          const result = credentialsSchema.safeParse(this);
          if (!result.success) {
              const message = result.error.issues[0].path + ": " + result.error.issues[0].message
              throw new ClientError(StatusCode.UnprocessableContent,message);
          }
      }
  
  }
  

