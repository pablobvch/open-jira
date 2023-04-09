import type { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../../database/db";
import mongoose from "mongoose";
import { db } from "@/database";
import { Entry, IEntry } from "@/models";

type Data = {
  message?: string;
};

const getEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | IEntry | null>
) => {
  const { id } = req.query;
  await db.connect();
  const entry = await Entry.findById(id);

  if (!entry) {
    await db.disconnect();
    return res.status(400).json({ message: `No hay entrada por ese ${id}` });
  }
  await db.disconnect();
  return res.status(200).json(entry);
};

const updateEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | IEntry | null>
) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: `No hay entrada por ese ${id}` });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    return res.status(200).json(updatedEntry);
  } catch (error: any) {
    // console.log(error);
    // error.errors.status.message.message
    console.log(error.errors.status);

    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }

  // entryToUpdate.description = description;
  // entryToUpdate.status = status;
  // await entryToUpdate.save();
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | IEntry | null>
) {
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: `El id no es valido ${id}` });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);

    case "GET":
      return getEntry(req, res);

    default:
      return res.status(400).json({ message: `Metodo no existe` });
  }
}
