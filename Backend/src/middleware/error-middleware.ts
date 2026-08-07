import colors from "colors"
import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../models/enums";
import { ClientError } from "../models/client-error";
class ErrorMiddleware {
    public routeNotFound(request: Request, response: Response, next: NextFunction): void {
        const err = new ClientError(StatusCode.NotFound, `Route ${request.originalUrl} on method ${request.method} not found`)
        next(err);
    }
    public catchAll(err: any, request: Request, response: Response, next: NextFunction): void {
        const status = err.status || StatusCode.InternalServerError;
        const message = err.message;
        response.status(StatusCode.InternalServerError).json({ message });
        console.log(colors.red(message));
        
    }

}
export const errorMiddleWare = new ErrorMiddleware();