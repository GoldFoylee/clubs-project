import createError from "../utils/createError.js";
export const authorizeRoles=(...allowedRoles)=>{
    return (req,res,next)=>{
        if (!allowedRoles.includes(req.user.role)){
            return next(createError(403,"You are not allowed to perform this action"))
        }
        next()
    }
}