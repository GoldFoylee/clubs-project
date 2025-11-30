import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
import createError from "../utils/createError.js";

const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

const cookieOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await prisma.user.findUnique({
      where: { email },
    });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashed = bcrypt.hashSync(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: role || "STUDENT",
      },
    });
    const token = createToken(newUser.id, newUser.role);
    const {password:pw,...info}=newUser
    res.cookie("token", token, cookieOptions).status(201).send(info);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "SignUp Failed!" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return next(createError(400, "User does not Exists!"));
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return next(createError(400, "Invalid email or password"));
    const token = createToken(user.id, user.role);
    const {password:pw,...info}=user
    res.cookie("token", token, cookieOptions).status(200).send(info);
  } catch (err) {
    console.error(err);
  }
};

export const logout =(req,res)=>{
    res
    .clearCookie("token", { httpOnly: true})
    .status(200)
    .json({ message: "Logged out successfully" });
}
