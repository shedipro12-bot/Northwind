import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../models/enums";
import { cyber } from "../utils/cyber";
import { ClientError } from "../models/client-error";

class SecurityMiddleWare {
    public blacklist(request: Request, response: Response, next: NextFunction): void {
        const denyIpAddress = ["24.22.11.42, ", "24.42.55.1.1", ];
        const userIp = request.ip?.toString()!;
        console.log(userIp);
        
        if (denyIpAddress.includes(userIp)) {
            const message = "You are black listed!";
            response.status(StatusCode.Forbidden).json({ message })
        }
        else {
            next();
        }
    }
    // Verfiy logged-in:
    public verfiyLoggedIn(request: Request, response: Response, next: NextFunction): void {
        // Extract token:
        const authorization = request.headers.authorization; // Bearer the token
        const token = authorization?.substring(7);

        // if token is legal:
        if(cyber.verifyToken(token!)) {
            next();
        }
        else {
            const err = new ClientError(StatusCode.Unauthorized, "You're not logged in");
            next(err); // Go to catchAll middleware.
        }

        
    }

     public verifyAdmin(request: Request, response: Response, next: NextFunction): void {
        // Extract token:
        const authorization = request.headers.authorization; // Bearer the token
        const token = authorization?.substring(7);

        // if token is legal:
        if(cyber.verifyAdmin(token!)) {
            next();
        }
        else {
            const err = new ClientError(StatusCode.Unauthorized, "You dont have permition to do that.");
            next(err); // Go to catchAll middleware.
        }

        
    }

}
export const securityMiddleWare = new SecurityMiddleWare();