import { OkPacketParams } from "mysql2";
import { UserModel } from "../models/user-model";
import { dal } from "../utils/dal";
import { cyber } from "../utils/cyber";
import { Credentials } from "../models/credentials";
import { ClientError } from "../models/client-error";
import { StatusCode } from "../models/enums";

// Add user:
class UserService {
    public async addUser(user: UserModel): Promise<string> {
        // Validate:
        user.validate();
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
        credntials.validate();
        // 
        const sql = "select * from users where email = ? and password = ?";
        const values = [credntials.email, credntials.password];

        // Execute:
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
        // Return true if the email exists already and false if it dosent
        return !!user; // null --> fasle . {...} --> true;


        
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
