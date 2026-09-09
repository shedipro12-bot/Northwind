import { io, Socket } from "socket.io-client";
import { appConfig } from "../../../utils/app-config";
import "./chat.css";
import { notify } from "../../../utils/notify";
import { useForm } from "react-hook-form";
import { ChatModel } from "../../../models/chat-model";
import { useState } from "react";

let socket: Socket = null!;

export function Chat() {

    const { register, handleSubmit } = useForm<ChatModel>();
    const [chatList, setChatList] = useState<ChatModel[]>([]);

    // Connect once to the socket server: 
    function connect(): void {

        socket = io(appConfig.serverUrl);

        socket.on("server-welcome", (msg: string) => {
            notify.success(msg);
        });

        socket.on("server-message", (chat: ChatModel) => {
            setChatList(chatList => [...chatList, chat]);
        });
    }

    // Send message to server: 
    function send(chat: ChatModel): void {
        chat.id = crypto.randomUUID();
        socket.emit("client-message", chat);
    }

    // Disconnect from server: 
    function disconnect(): void {
        socket.disconnect();
    }

    return (
        <div className="Chat">
            <button onClick={connect}>Connect</button>
            <button onClick={disconnect}>Disconnect</button>
            <hr />

            <form onSubmit={handleSubmit(send)}>

                <label>Color: </label>
                <input type="color" {...register("color")} />

                <label>Nickname: </label>
                <input type="text" {...register("nickname")} />

                <label>Message: </label>
                <input type="text" {...register("message")} />

                <button>Send</button>
            </form>
            <hr />

            <div className="messages">
                {chatList.map(chat => <div key={chat.id} style={{color: chat.color}}>{chat.nickname}: {chat.message}</div>)}
            </div>

        </div>
    );
}
