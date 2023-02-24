import express from "express"; //ES Modules
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import connectDb from "./config/db.js";

//create app
const app = express();
app.use(express.json());

dotenv.config();

//connect db
connectDb();

// //config cors
app.use(cors());

//routing

app.use("/api/auth", userRoutes);

//define port
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});
