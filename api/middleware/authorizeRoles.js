import createError from "../utils/createError.js";
export const authorizeRoles=(...allowedRoles)=>{
    return (req,res,next)=>{
        if (!allowedRoles.includes(req.user.role)){
            return next(createError(403,"You are not allowed to perform this action"))
        }
        next()
    }
}
export const allowSelfOrAdmin=(req,res,next)=>{
    const id=req.params.id
    if (req.user.role==='ADMIN')return next()
    if (req.user.id===id)return next()
    return next(createError(403,"Access Denied"))
}