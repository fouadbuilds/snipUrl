import mongoose, { Schema } from 'mongoose';


interface Url {
    longUrl: string,
    shortUrl: string
}

const urlSchema = new Schema<Url> ({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
})

export default mongoose.model<Url>('Url', urlSchema);