import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const generateToken = (payload) => {
  try {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

export default generateToken;
