const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db');
const path = require('path');

const userRouter = require('./routes/userRoutes') 
const postRouter = require('./routes/postRouter')

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//routes
app.use("/api", userRouter)
app.use("/api", postRouter)
//error handling

// public folder
  // Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));
  // Route to serve your main HTML file
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..','public', 'html','index.html'));
});

app.get('/explore.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'explore.html'));
});

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'register.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'));
});


//server running
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port http://localhost:${port}/index.html`);
});