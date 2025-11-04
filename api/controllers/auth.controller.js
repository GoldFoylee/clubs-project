import bcrypt from "bcryptjs";
import prisma from "../db/prisma.js";
import generateToken from "../utils/generateToken.js";


export const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email: normalizedEmail,
        password: hashedPassword,
      },
    });
    const token = generateToken({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
    return res.status(201).json({
      message: "User registered successfully.",
      token,
    });
  } catch (err) {
    console.error("Error during registration:", err);
    if (err.code === "P2002") {
      return res.status(409).json({ message: "Email already in use." });
    }
    return res.status(500).json({ message: "Internal server error." });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const token = generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
    });
    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

