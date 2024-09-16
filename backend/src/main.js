import express from "express";
import http from "http";
import uploadConfig from "./config/multer.mjs";
import { Server } from "socket.io";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an instance of Express
const app = express();
const port = 3000; // Replace with your desired port number

// Create an HTTP server instance
const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your client URL
    methods: ["GET", "POST"],
  },
});
const upload = multer(uploadConfig.upload(`./tmp`));

// Define a route
app.get("/", (req, res) => {
  res.send("Hello, world!"); // Send a response to the client
});

app.post("/document", upload.single("file"), (req, res) => {
  try {
    res.send("File uploaded successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("sendData", (data) => {
    const filePath = path.resolve(__dirname, "documents", "guia.pdf");
    const base64String = fs.readFileSync(filePath, { encoding: "base64" });

    try {
      io.emit("fileData", base64String);
    } catch (error) {
      console.error("Error saving PDF:", error);
    }
  });

  socket.on("sendBackImage", (data) => {
    // Broadcast the image back to Vue.js clients
    io.emit("imageFromReactNative", data);
  });

  socket.on("close", () => {
    console.log("A user disconnected:", socket.id);
  });
});
// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
