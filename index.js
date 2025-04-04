import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/model/db.js";
import cookiepparser from "cookie-parser";

//import all routes
import userRoutes from "./controller/user.controller.js"
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use( 
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedheaders: ['Content-Type', 'Authorization'],
})
);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('bro code');
});



//connect to db
db();

//user routes

app.use("/api/v1/users/", userRoutes)    // if any file after users will come than it will be transferred to userRoutes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
