import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,                  //what type of data will come from in the database
    role: {
        type: String,
        enum: ["user", "admin"],
        dafault: "user",
    },
    isverified: {
        type: Boolean,
        dafault: false,
    },
    verificationToken: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
}, 
{
    timestamps: true,
}
);

userSchema.pre("save", async function(){
   if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10)
    next();
}
else{

}



});



const User = mongoose.model("User", userSchema)

export default User;