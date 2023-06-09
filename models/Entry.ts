import { Entry } from "@/interfaces";
import { Model, Schema } from "mongoose";
import mongoose from "mongoose";

export interface IEntry extends Entry {}

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished", "removed"],
      message: `{VALUE} no es un estado permitido`
    },
    default: "pending"
  }
});

const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
