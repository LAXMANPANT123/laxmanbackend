 import user from "..model/user.model.js"
 import crypto from "crypto"
 import nodemailer from "nodemailer" 
 import bcrypt from "bcryptjs";
 import jwt from "jsonwebtoken";
import User from "../utils/model/user.model";
 
  
const registerUser = async (req, res) => {                 //get validate  //get data    /check if user is already  //create a user in db

    // create a verificaation token
    //save token in database
    //send token as email to user
    //send sucess status to user
    const {name, email, password} = req.body
    if(!name|| !email|| !password) {
        return res.status(400).json({
            message: "All fields are required", 
        });
    }
    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message: "user already exist"
            })
        }

        const user = await User.create({
            name,
            email,
            password
        })
        console.log(user);


        if(!user){
            return res.status(400).json({
                message:"user not registered",
            });
        }
        const token = crypto.randomBytes(32).toString("hex")
        console.log(token);
        user.verificationToken  = token

        await user.save()

        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: process.env.MAILTRAP_USERNAME,
              pass: process.env.MAILTRAP_PASSWORD,
            },
          });


          const mailOption = {
            from: process.env.MAILTRAP_SENDERMAIL,
            to: user.email, // list of receivers
            subject: "verify your email", // Subject line
            text: `please click on the following link: 
            ${process.env.BASE_URL}/api/v1/users/verify${token}
            `,
        };


        await transporter.sendMail(mailOption)
        res.status(201).json({
            messege: "user registered sucessfully",
            success: true,
        });

        }  catch (error) {
            res.status(400).json({
                message: "user not registered ",
                error,
                sucess: false
            });
        }
};

const verifyUser = async (req, res) => {
    //get token from url
    //validate
    //find user based on token
    //if not
    //set isverified field to true
    //remove verification token  
    //save 
    //return response

    const { token } =req.params;
    console.log(token);
    if(!token){
        return res.status(400).json({
          message: "invalid token"
        });
    }
    const user = await User.findOne({verificationToken: token})

    if(!user){
        return res.status(400).json({
          message: "invalid token"
        });
    }


    user.isVerified = true
    user.verificationToken = undefined
    await user.save()
};

const login = async (req, res) =>{
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({
            message: "all field are required"
    });
    }
    try {
       const user = await user.findOne({email}) 
       if(!user){
        return res.status(400).json({
          message: "invalid email or password"
        });
       }

       //bcyrpt  checks wheather the password is match or not and compare the values

       const isMatch = await bcrypt.compare(password, user.password)

       console.log(isMatch);

       if(!isMatch){
        return res.status(400).json({
          message: "invalid email or password"
        });
       }

       //jwt is a token

       const token = jwtsign({id: user._id, role: user.role},
        process.env.JWT_SECRET, {
            expiresIn: '24hr'
        }
       );


       //cookie add
       const cookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 24*60*60*1000
       }
       res.cookie("token", token, cookieOptions)
       res.status(200).json({
        success: true,
        message: "login successful",
        token,
        user: {
            id: user._id,
            name: user.nmae,
            role: user.role,
        },
       });

    }catch (error){

    }
}


const getMe = async (req, res) => {
    try{
     const user = await User.findById(req.user.id).select('-password')

     if(!user){
        return res.status(400).json({
            success: false,
          message:"user not found",
        });
     }

     res.status(200).json({
        success:true,
        user,
     });
    }
    catch (error) {}
}

const logoutUser= async (req, res) => {
    try{
        res.cookie("token", '', {})
        return res.status(400).json({
            success: false,
          message:"logged out successfully",
        });
    }
    catch (error) {}
}

const forgotPassword = async (req, res) => {
    try{
        //get email
        //find user based on email
        //reset token + reset expirely => date.now() + 10*60*1000 => user.save()
        //send mail = > design url

     
    }
    catch (error) {}
}
const resetPassword = async (req, res) => {
    try{
        //collect token form params
        //passwrod from req.body
        const {token} = req.params;
        const {password, confPassword} = req.body;

        try {
            const user = await User.findOne({
                resetPasswordToken:token,
                resetOasswordExpires: {$dt:Date.now()},
            });
            //set password in user
            //resetToken, resetExpiry => reset
            //save
        }
        catch (error) {

        }
     
    }
    catch (error) {

    }
}

export { registerUser, verifyUser, login, getMe,logoutUser, resetPassword, forgotPassword };
