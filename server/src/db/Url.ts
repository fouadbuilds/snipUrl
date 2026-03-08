import mongoose, { Schema } from "mongoose";

interface Url {
  longUrl: string;
  shortUrl: string;
}

const urlSchema = new Schema<Url>({
  longUrl: { type: String, required: true },
  shortUrl: {
    type: String,
    unique: true,
    sparse: true, 
  },
});
export default mongoose.model<Url>("Url", urlSchema);
