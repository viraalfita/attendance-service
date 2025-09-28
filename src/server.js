import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import userRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/companies", companyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
