import express from "express";
import { productController } from "./controllers/product-controller";
import { appConfig } from "./utils/app-config";
import { loggerMiddleWare } from "./middleware/logger-middleware";
import { securityMiddleWare } from "./middleware/security-middleware";
import { errorMiddleWare } from "./middleware/error-middleware";
import { userController } from "./controllers/user-controller";
import expressFileUpLoad from "express-fileupload";
import { saver } from "smart-saver";
import path from "node:path";
import cors from "cors"

class App {
    public start(): void {
        const server = express();
        // Configure smart saver:
        // Create our server object:
        saver.config(path.join(__dirname, "assets", "images"));
        // System middleware
        server.use(cors()); // Enable CORS;
        server.use(express.json()); // Configure express to create request.body from a given JSON.
        server.use(expressFileUpLoad()); // Configure express to create request.files from the request.

        // Register before middleware:
        server.use(loggerMiddleWare.logToConsole);
        server.use(securityMiddleWare.blacklist);





        // Register  Controllers routes:
        server.use(userController.router)
        server.use(productController.router);

        // Register "after" Middleware 
        server.use(errorMiddleWare.routeNotFound)
        server.use(errorMiddleWare.catchAll);

        //Run server:
        server.listen(appConfig.port, () => console.log("Listening...."));

    }
}

const app = new App()
app.start();