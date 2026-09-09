import { Server as HttpServer } from "http";
import { Server as SocketServer, ServerOptions, Socket } from "socket.io";
import { ChatModel } from "../models/chat-model";

class SocketService {

    // Socket server:
    private socketServer: SocketServer = null!;

    // Start listening:
    public start(httpServer: HttpServer): void {

        // Enable CORS: 
        const options: Partial<ServerOptions> = { cors: { origin: "*" } };

        // Create socket server: 
        this.socketServer = new SocketServer(httpServer, options);

        // Listen to new client connection:
        this.socketServer.sockets.on("connection", (socket: Socket) => {

            console.log("New client has been connected...");

            // Listen to client messages:
            socket.on("client-message", (chat: ChatModel) => {
                console.log("Client sent message: ", chat);
                this.socketServer.sockets.emit("server-message", chat);
            });

            // Server send message to client: 
            setTimeout(() => {
                socket.emit("server-welcome", "You have been successfully connected.");
            }, 1000);

            // Listen to client disconnect:
            socket.on("disconnect", () => {
                console.log("Client has been disconnected...");
            });

        });

    }

}

export const socketService = new SocketService();
