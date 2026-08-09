import { OkPacketParams } from "mysql2";
import { UserModel } from "../models/user-model";
import { dal } from "../utils/dal";
import { cyber } from "../utils/cyber";
import { Credentials } from "../models/credentials";
import { ClientError } from "../models/client-error";
import { Role, StatusCode } from "../models/enums";
import { appConfig } from "../utils/app-config";
import axios from "axios";
import { success } from "zod";

// Add user:
class UserService {

    public async verifyHuman(captchaToken: string): Promise<void> {
        // Create parameters to send to google:
        const params = new URLSearchParams();
        params.append("secret", appConfig.recaptchaSecretKey); // Secret Key
        params.append("response", captchaToken) // Captcha Token (response from google component)

        // Ask google if user is human or bot:
        const url = "https://wwww.google.com/recaptcha/api/siteverify"
       const response = await axios.post(url, params);
       const success = response.data.success; // true --> user is a human

       // Throw if BOT:
       if(!success) {
        throw new ClientError(StatusCode.Forbidden, "You've failed The CAPTCHA test.");
       }

    }

    public async addUser(user: UserModel): Promise<string> {

        // Validate:
        user.validate();
        await this.verifyHuman(user.captchaToken);

        // Set lowest role when registreting;
        user.roleId = Role.User;

        // Hash users passwords:
        user.password = cyber.hash(user.password);

        // if email is taken:
        if (await this.isEmailExist(user.email)) {
            throw new ClientError(StatusCode.Conflict, "This Email is already registered");
        }
        // SQL:
        const sql = `insert into users(firstName, lastName,email,password, roleId) values(? ,?, ?, ?, ?) `
        const values = [user.firstName, user.lastName, user.email, user.password, user.roleId];

        // Execute:
        const info = await dal.execute(sql, values) as OkPacketParams;
        user.id = info.insertId!
        // Generate token:
        const token = cyber.generateToken(user);
        return token;


    }
    // login:
    public async login(credntials: Credentials): Promise<string> {
        // Validation
        credntials.validate();

        credntials.password = cyber.hash(credntials.password);
        // SQL:
        const sql = "select * from users where email = ? and password = ?";
        const values = [credntials.email, credntials.password];
        // const sql = `select * from users where email = '${credntials.email}' and password ='${credntials.password}'`
        // // Execute:
        const users = await dal.execute(sql, values) as UserModel[];
        const user = users[0];

        // if no such user: 
        if (!user) {
            throw new ClientError(StatusCode.Unauthorized, "Incorrect email or password");
        }
        // Generate token:
        const token = cyber.generateToken(user);
        return token;
    }
    // Check if emails exist: 
    private async isEmailExist(email: string): Promise<boolean> {
        // SQL:
        const sql = "select id from users where email = ?";
        const values = [email]

        // Execute:
        const users = await dal.execute(sql, values) as UserModel[];
        const user = users[0]
        // Return true if the email exists already and false if it does not
        return !!user; // null --> false . {...} --> true;



        // private async isEmailTaken(email: string): Promise<boolean> {
        //     const sql = "select count(*) as totalUsers from users where email = ?";
        //     const values = [email];
        //     const results = await dal.execute(sql, values) as { totalUsers: number }[];
        //     const totalUsers = results[0].totalUsers;
        //     return totalUsers > 0;
        // }

        // private async isEmailTaken(email: string): Promise<boolean> {
        //     const sql = "SELECT EXISTS(SELECT 1 FROM users WHERE email = ?) AS emailExists";
        //     const values = [email];
        //     const result = await dal.execute(sql, values) as { emailExists: number }[];
        //     return result[0].emailExists === 1;
        // }


    }
}

export const userService = new UserService();
