const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db');

const userRouter = require('./routes/userRoutes') 

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api", userRouter)

//error handling

// testing postgres

app.get("/", async(req, res) => {
  const result = await pool.query("SELECT  current_database()");
  res.send(`The database name is : ${result.rows[0].current_database}`);
})

//server running
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});