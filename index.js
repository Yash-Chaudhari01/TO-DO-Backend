const express = require('express');
const app = express();

const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todo');
const { dbConnect } = require('./database/dbconnect');

const cookieParser = require('cookie-parser');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/todo', todoRoutes);

// Database Connection
dbConnect();

//Basic Setup
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started successfully at port No ${port}`);
});


