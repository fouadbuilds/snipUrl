import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;


app.get('/', (req, res) => {
  res.send('This is the Homepage')
})


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})