import createError from "../utils/createError.js";
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";

export const getSingleUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const User = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).send(User);
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  // ALSO NEED TO CHECK WHEATHER THE USER IS AUTHORIZED TO DELETE THE USER WITH USERID
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) return next(createError(403, "User not found"));
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).send("UserDeleted");
  } catch (err) {
    next(err);
  }
};
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  // ALSO NEED TO CHECK WHEATHER THE USER IS AUTHORIZED TO UPDATE THE USER WITH USERID
  //THIS WE GONNA DO AFTERWARDS BCOZ AUTH NEEDED FOR PASSWORD
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) return next(createError(404, "User not found"));
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.email !== undefined && { email: data.email }),
        ...(data.role !== undefined && { role: data.role }),
        ...(data.password !== undefined && {
          password: bcrypt.hashSync(data.password, 10),
        }),
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
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
};
