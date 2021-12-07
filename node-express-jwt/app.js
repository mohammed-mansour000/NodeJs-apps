const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const authRoutes = require('./routes/authRoute');
const { authRequire, checkUser } = require('./middleware/authMiddleware');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = `${process.env.MONGODB_URI}`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {app.listen(3001);console.log("connected")})
  .catch((err) => console.log(err));

  // routes
  app.get('*', checkUser); //apply checkUser to every single get route
  app.get('/', authRequire, (req, res) => res.render('home'));
  app.get('/smoothies', authRequire, (req, res) => res.render('smoothies'));
  app.use('', authRoutes);
