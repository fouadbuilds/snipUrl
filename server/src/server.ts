import express from "express";
import cors from 'cors'
import apiRoutes from './routes/url.routes.js'
import connectDB from "./db/database.js";


const app = express();
const PORT = Number(process.env.PORT) || 3000;
app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
  res.send('This is the Homepage')
})

app.use('/api', apiRoutes)




connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
})