import mongoose from "mongoose";
import { nanoid } from "nanoid";

const shortSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: () => nanoid().substring(0, 10),
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

export default mongoose.model("ShortUrl", shortSchema);
