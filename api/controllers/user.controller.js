import createError from "../utils/createError.js";
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";

export const getSingleUser = async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) return next(createError(404, "User not found"));
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) return next(createError(403, "User not found"));
    await prisma.user.delete({ where: { id } });
    res.status(200).send("UserDeleted");
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) return next(createError(404, "User not found"));
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
        ...(data.role && { role: data.role }),
        ...(data.password && { password: bcrypt.hashSync(data.password, 10) }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const getUserDashboard = async (req, res, next) => {
  try {
    const userId =  Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        clubs: { include: { club: true } },
        events: { include: { event: true } },
      },
    });

    if (!user) return next(createError(404, "User not found"));

    const response = {
      id: user.id,
      name: user.name,
      role: user.role,
      joinedClubs: user.clubs.map((cm) => ({
        id: cm.club.id,
        name: cm.club.name,
        role: cm.role,
      })),
      eventsRegistered: user.events.map((er) => ({
        id: er.event.id,
        title: er.event.title,
        date: er.event.date,
        venue: er.event.venue,
      })),
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return next(createError(400, "name, email and password are required"));
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: role || "STUDENT",
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create user",
      error: err.message || String(err),
      code: err.code || null,
      meta: err.meta || null,
    });
  }
};
