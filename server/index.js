import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('./uploads'));


app.get("/", (req,res) => {
    res.send("hello");
});

app.use("/api/auth", authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT;

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



