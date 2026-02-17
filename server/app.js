import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authPath from "./routes/authRoute.js";
import userPath from "./routes/userRoute.js";

/*=========================================*/
/*=========================================*/
/*=========================================*/

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*=========================================*/

const app = express();
app.use(express.json());

/*=========================================*/

// Make the 'uploads' directory publicly accessible via /uploads URL path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/*=========================================*/

// cors just work with devlopment,cos the client and server are on same domain, no need to use cors
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}

/*=========================================*/

// cookie Parser
app.use(cookieParser());

// connect to db
connectDB();

/*=========================================*/

// routes  
app.use("/api/auth", authPath);
app.use("/api/user", userPath);

//  app.get('/', (req, res) => {
//     res.send("hello world !");
// });

/*=========================================*/

// to avoid the * issue in node new version
if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.resolve(__dirname, "../client/dist");
  app.use(express.static(clientDistPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(clientDistPath, "index.html"));
  });
}
 
/*=========================================*/

// port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`the server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)); 