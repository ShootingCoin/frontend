import { io } from "socket.io-client";

const BE_ORIGIN = process.env.BE_ORIGIN;

export const socketClient = io(BE_ORIGIN);