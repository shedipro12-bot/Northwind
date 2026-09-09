import express, { Request, Response, Router } from "express";
import { promptService } from "../services/prompt-service";

class RagController {

    public router: Router = express.Router();

    public constructor() {
        this.router.get("/api/ask", this.ask);
    }

    private async ask(request: Request, response: Response): Promise<void> {
        const question = request.body.question;
        const topResultsCount = request.body.topResultsCount || 3;
        const answer = await promptService.ask(question, topResultsCount);
        response.send(answer);
    }

}

export const ragController = new RagController();
