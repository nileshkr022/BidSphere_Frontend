import { io } from "socket.io-client";

let socket = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

// Use the same base URL as API
const rawBaseUrl = import.meta.env.VITE_BASE_URL || "";
const socketUrl = rawBaseUrl.replace(/\/$/, ""); // remove trailing slash

export const initializeSocket = () => {
    if (!socket) {
        socket = io(socketUrl, {
            withCredentials: true,
            reconnection: true,
            reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000,
        });

        socket.on("connect", () => {
            reconnectAttempts = 0;
        });

        socket.on("connect_error", () => {
            reconnectAttempts++;
            if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
                disconnectSocket();
            }
        });

        socket.on("disconnect", (reason) => {
            if (reason === "io server disconnect") {
                socket.connect();
            }
        });
    }
    return socket;
};

export const getSocket = () => {
    if (!socket) {
        return initializeSocket();
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
        reconnectAttempts = 0;
    }
};
