import createError from "../utils/createError.js";
import prisma from "../db/prisma.js";
export const getEvents = async (req, res, next) => {
  try {
    const allEvents = await prisma.event.findMany();
    res.status(200).send(allEvents);
  } catch (err) {
    next(err);
  }
};
export const createEvent = async (req, res, next) => {
  const data = req.body;
  try {
    const newEvent = await prisma.event.create({
      data: {
        clubId: data.clubId,
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        venue: data.venue,
        capacity: data.capacity || null,
      },
      include: {
        club: true,
      },
    });
    res.status(201).send(newEvent);
  } catch (err) {
    next(err);
  }
};
export const updateEvent = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedEvent = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        ...(data.clubId && { clubId: data.clubId }),
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        ...(data.date && { date: new Date(data.date) }),
        ...(data.venue && { venue: data.venue }),
        ...(data.capacity !== undefined && { capacity: data.capacity }),
      },
      include: {
        club: true,
      },
    });
    res.status(201).send(updatedEvent);
  } catch (err) {
    next(err);
  }
};
