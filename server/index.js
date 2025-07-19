import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.send("hello");
});

app.use("/api/auth", authRoutes)

const PORT = process.env.PORT;

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



