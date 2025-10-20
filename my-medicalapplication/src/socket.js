import { io } from "socket.io-client";

// connect to your backend server
const socket = io("http://localhost:3001");

export default socket;
