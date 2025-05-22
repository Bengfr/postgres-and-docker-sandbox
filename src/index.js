const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db');
const path = require('path');

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

// public folder
  // Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));
  // Route to serve your main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..','public', 'html','index.html'));
});

//server running
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});