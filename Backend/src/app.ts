import cors from "cors";
import express, { Express } from "express";
import expressFileUpload from "express-fileupload";
import mongoose from "mongoose";
import path from "path";
import { saver } from "smart-saver";
import { productController } from "./controllers/product-controller";
import { supplierController } from "./controllers/supplier-controller";
import { userController } from "./controllers/user-controller";
import { errorMiddleware } from "./middleware/error-middleware";
import { securityMiddleware } from "./middleware/security-middleware";
import { appConfig } from "./utils/app-config";
import { saleController } from "./controllers/sale-controller";
import { socketService } from "./services/socket-service";
import { ragController } from "./controllers/rag-controller";
import { northwindMcpServer } from "./ai/mcp-server";
import { sseHandlers } from "express-mcp-handler";

class App {
    
    // Create our server object:
    public server = express();

    public async start(): Promise<void> {

        // Connect to MongoDB:
        await mongoose.connect(appConfig.mongodbConnectionString);
        // await SupplierModel.syncIndexes(); // Do synchronize indexes (like unique)

        // Configure smart-saver - images path:
        saver.config(path.join(__dirname, "assets", "images"));

        // System middleware:
        securityMiddleware.registerRateLimit(this.server); // Prevent DoS attacks.
        securityMiddleware.headerProtection(this.server); // Prevent header attacks.
        this.server.use(cors()); // Enable CORS.
        this.server.use(express.json()); // Configure express to create request.body from a given JSON.
        this.server.use(expressFileUpload()); // Configure express to create request.files from the request.
        this.server.use("/ping", errorMiddleware.ping)

        // Register "before" middleware: 
        // this.server.use(loggerMiddleware.logToConsole);
        this.server.use(securityMiddleware.preventXss);
        this.server.use(securityMiddleware.blackList);

        // Register controllers:
        this.server.use(userController.router);
        this.server.use(productController.router);
        this.server.use(supplierController.router);
        this.server.use(saleController.router);
        this.server.use(ragController.router);

        // Register MCP server:
        const mcpServer = northwindMcpServer.create();
        const mcpController = sseHandlers(() => mcpServer, {}); // SSE = Server-Sent Events
        this.server.get("/sse", mcpController.getHandler);
        this.server.post("/sse", mcpController.postHandler);
        this.server.post("/messages", mcpController.postHandler);


        // Register "after" middleware:
        this.server.use(errorMiddleware.routeNotFound);
        this.server.use(errorMiddleware.catchAll);

        // Run server:
        const httpServer = this.server.listen(appConfig.port, () => console.log("Listening..."));
        socketService.start(httpServer);
    }

}

export const app = new App();
app.start();

// taskkill /F /IM node.exe
