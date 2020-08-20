const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./api/routes/user');
const friendsRoute = require('./api/routes/friendlist');
const fileRoutes = require('./api/routes/filedata');

// Load ENV variable
dotenv.config({ path: './config/config.env' });

// Connect to DB
require('./config/db');

const app = express();

// Setup CORS
app.use(cors());

// Use incoming requests
app.use(express.json());

// Dev Logging Middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Setup static files path
app.use('/uploads', express.static('uploads'));

// Mount Routes
app.use('/api/users', userRoutes);
 app.use('/api/friends', friendsRoute);
// app.use('/api/files', fileRoutes);

// Upload
app.use('/api/uploads*', (req, res, next) => {
  try {
    res.sendFile(__dirname + '/uploads' + req.params[0]);
    

  } catch (error) {
    next();
  }
});
// Mail verification
app.get('/confirmation/:token', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.params.token, process.env.JWT_SECRET);
    // console.log(decodedToken);
    await User.findByIdAndUpdate(decodedToken.id, { verifiedUser: true } );
    res.redirect('http://localhost:4200/login');
  } catch (e) {
    res.send('error');
  }
});


module.exports = app;