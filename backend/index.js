import express from "express";
import { connectDB } from "./database/connection.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));

app.use(express.json()); // allow us to parse incoming requests
app.use(cookieParser()); // allow us to parse incoming cookies

app.get("/", (req, res) => {
    res.send("Hello World from the backend");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server is running on port ", PORT);
});