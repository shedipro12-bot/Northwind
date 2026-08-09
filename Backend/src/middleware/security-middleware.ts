import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../models/enums";
import { cyber } from "../utils/cyber";
import { ClientError } from "../models/client-error";
import striptags from "striptags";
import expressRateLimit from "express-rate-limit"
import { Express } from "express";
import helmet from "helmet";
class SecurityMiddleWare {
    public blacklist(request: Request, response: Response, next: NextFunction): void {
        const denyIpAddress = ["24.22.11.42, ", "24.42.55.1.1",];
        const userIp = request.ip?.toString()!;


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
        if (cyber.verifyToken(token!)) {
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
        if (cyber.verifyAdmin(token!)) {
            next();
        }
        else {
            const err = new ClientError(StatusCode.Unauthorized, "You dont have permition to do that.");
            next(err); // Go to catchAll middleware.
        }
        // Prevent XSS attack:

    }
    public preventXss(request: Request, response: Response, next: NextFunction): void {
        // Run on body object:
        for (const prop in request.body) {
            // Take prop value:
            const value = request.body[prop];
            if (typeof value === "string") {
                // Remove tags
                request.body[prop] = striptags(value);
            }
        }
        next(); // Continue:
    }
    public registerRateLimit(server: Express): void {
        // Prevent Dos attack:
        server.use(expressRateLimit({
            windowMs: 1000, // Time window in miliiseconds.
            limit: 5, // How many requests allowed in that window.
            skip: (request: Request) => request.path.startsWith("/api/products/images/") // Skips the limit when requesting the images.
        }));


        server.use(("/api/products/images/"), expressRateLimit({ // Only images
            windowMs: 1000, // Time window in miliiseconds.
            limit: 200, // How many requests allowed in that window.
        }));
    }
    // Use Helemt to protect header attacks:

    public headerProtection(server: Express): void {
        server.use(helmet({
            crossOriginResourcePolicy: {policy: "same-site" } // Enable CORS on images.
        }));
       
    }
}
export const securityMiddleWare = new SecurityMiddleWare();