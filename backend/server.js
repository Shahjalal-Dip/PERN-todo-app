const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

const PORT = process.env.PORT || 5000;
const app = express(); 

//middleware
app.use(cors({ 
  origin: ['https://todoappfrontend-sigma.vercel.app', 'http://localhost:3000'],
  credentials: true 
}));


app.use(express.json()); //req.body
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Vercel!");
});


app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});

module.exports = app;