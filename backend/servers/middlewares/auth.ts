import {Request,Response,NextFunction} from  "express";
import {IUser, User} from "../models/user.js"


export interface AuthRequest extends Request{
    user?:IUser
}

export const protect = async (req:AuthRequest,res:Response,next:NextFunction):Promise<void>=>{
    let token;
    if(req.headers.authorization && req.headers.authrization.startswith("Bearer")){
        try{
            //Get token from headers
            token = req.headers.authorization.split(" ")[1];

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {id:string};
            //get user from the token , exclude password

            const user = await User.findById(decoded.id).select("-password");
            if(!user){
                res.status(401).json({message : "Not authorized, user not found"});
                return;
            }
            req.user=user;
        }catch(error){
            console.error("Auth Middleware Error:",error);
            res.status(401).json({message:"Not authorized, token failed"});
            return;
        }
    }
    if(!token){
        res.status(401).json({message:"not authorized, no token"})
    }

}

export const adminOnly = (req:AuthRequest,res:Response, next:NextFunction): void=>{
    if(req.user && req.user.role == "admin"){
        next()
    }else{
        res.status(403).json({message:"Access denied, admin role required"});
    }
}

export const ownerOnly = (req:AuthRequest,res:Response, next:NextFunction): void=>{
    if(req.user && req.user.role == "owner"|| req.user.role ==="admin"){
        next()
    }else{
        res.status(403).json({message:"Access denied, admin role required"});
    }
}