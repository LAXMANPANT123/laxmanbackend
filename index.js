import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js";
// const db = require('./utils/db.js')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use( 
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedheaders: ['Content-Type', 'Authorization'],
})
);


app.get('/', (req, res) => {
  res.send('bro code');
});



//connect to db
db();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
