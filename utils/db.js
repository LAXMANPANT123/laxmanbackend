import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

//export a function that connect to db
 const db = () =>{
    mongoose.connect(process.env.MONGO_URL)


    //if it connects successsfully it will go in than otherwise it will go in catch which will cause error
.then(() => {
    console.log("connected to mongodb")
})
.catch((err)=> {
    console.log("error conecting to mongodb", err);
})
}

 export default db;