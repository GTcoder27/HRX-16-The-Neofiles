import express from 'express';
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import modelRoutes from './routes/model.route.js';



const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
// // allowedHeaders: ["Content-Type", "Authorization"]  //Add other headers you want to pass through CORS request
// }));

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use("/api",modelRoutes);




app.listen(3000,()=>{
    console.log('server is running on port '+ 3000);
    // connectDB();
});

 





