import jwt from "jsonwebtoken";


//if there is uncertainity use try catch

export const isLoggedIn = async (req, resizeBy, next) => {
    try{
        console.log(req.cookies);
        let token = req.cookies?.token

        console.log("token found: ", token ? "YES" : "NO");

        if(!token){
            console.log("no token");
            return req.status(401).json({
                success: false,
                message: "authentication failed",
            });

        }

        //token me se token nikalna ko lagi jwt use garne ho hai 
    
        
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded data: ", decoded);
        req.user = decoded;
        next() ;
       

        
    }catch(error) {
        console.log("auth middleware failure");
        return res.status(401).json({
            success: false,
            message: "internal server error",
        });
    }
    
};

