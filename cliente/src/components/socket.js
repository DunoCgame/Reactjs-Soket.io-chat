import io from "socket.io-client";

// let socket = io("//localhost:3000");

const socket = io("http://localhost:3000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

export default socket;