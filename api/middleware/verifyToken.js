import jwt, { decode } from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(createError(401, "Not Authenticated"));
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return next(createError(403, "Invalid or expired token"));
    req.user = decoded; //{id,role}
    next();
  });
};
