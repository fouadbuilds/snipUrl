import express from "express";
import cors from 'cors'
import apiRoutes from './routes/url.routes.js'
import connectDB from "./db/database.js";
import { fileURLToPath } from 'url'
import path from 'path'



const app = express();
const PORT = Number(process.env.PORT) || 3000;
app.use(cors())
app.use(express.json());


const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname, '../../client')))


// Routes
app.use('/api', apiRoutes)   // for POST /api/shorten
app.use('/', apiRoutes)      // for GET /:shortCode




connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
})