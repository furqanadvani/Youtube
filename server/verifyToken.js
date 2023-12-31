import Jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token
    console.log(req.cookies, "++++++++")
    if(!token) return next(createError(401 , "You are not authenticated!"));

    Jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err) return next(createError(403, "toke is not valid!"));
        req.user = user;
        next()

    });
}