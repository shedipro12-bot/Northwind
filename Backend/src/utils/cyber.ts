import { UserModel } from "../models/user-model";
import jwt, { SignOptions } from "jsonwebtoken";
import { appConfig } from "./app-config";
import { Role } from "../models/enums";
class Cyber {
    public generateToken(user: UserModel): string {
        // Create payload:
        const payload = { user };
        // Create options:
        const options: SignOptions = { expiresIn: "3h" };

        // Generate token:
        const token = jwt.sign(payload, appConfig.jwtSecret!, options);
        return token;
    }

    // Verify Token:
    public verifyToken(token: string): boolean {
        // if no token found:
        try {

            if (!token) {
                return false

            }
            // verify
            // Valid token
            jwt.verify(token, appConfig.jwtSecret!);
            // Extract payload:
            // Extract user: 
            const payload = jwt.decode(token) as { user: UserModel }
            const user = payload.user;
            //if user is not admin deny access:
            if (user.roleId !== Role.Admin) return false;
            return true
        }
        catch (err: any) {
            return false; // Token illegal
        }
    }
    public verifyAdmin(token: string): boolean {
        // if no token found:
        try {

            if (!token) {
                return false

            }
            // verify
            jwt.verify(token, appConfig.jwtSecret!);
            // Valid token
            return true;
        }
        catch (err: any) {
            return false; // Token illegal
        }
    }

}

export const cyber = new Cyber();
