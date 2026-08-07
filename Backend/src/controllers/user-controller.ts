import express, { Response, Request,Router } from "express";
import { UserModel } from "../models/user-model";
import { userService } from "../services/user-service";
import { StatusCode } from "../models/enums";
import { Credentials } from "../models/credentials";

class UserController {
    public router: Router = express.Router();
    // Constructor - register routes:
    public constructor() {
        this.router.post("/api/register", this.addUser);
        this.router.post("/api/login", this.login);

    }
    // Add user:
    private async addUser(request: Request, response: Response): Promise<void> {
        const user = new UserModel(request.body);
        const token = await userService.addUser(user);
        response.status(StatusCode.Created).json(token);
    }
    // Login:
    private async login(request: Request, response: Response): Promise<void> {
        const credentials = new Credentials(request.body);
        const token = await userService.login(credentials);
        response.json(token)
    }

}

export const userController = new UserController();