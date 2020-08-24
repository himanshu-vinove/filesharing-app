const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
var bodyParser = require('body-parser')
const cors = require('cors');
var PORT = process.env.PORT || 3000;
const User = require("./serverapi/models/User");
const jwt = require('jsonwebtoken');
// var app = express()

const userRoutes = require('./serverapi/routes/user');
const friendsRoute = require('./serverapi/routes/friendlist');
const fileRoutes = require('./serverapi/routes/filedata');

// Load ENV variable
dotenv.config({ path: './config/config.env' });

// Connect to DB
require('./config/db');
const app = express();


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

// Setup CORS
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});


// Use incoming requests
app.use(express.json());

// Dev Logging Middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Setup static files path
app.use('/uploads', express.static('uploads'));
app.use('/uploadedfiles', express.static('uploadedfiles'));




//const server = http.createServer(app);

app.listen(PORT, () => {
  console.log(`server Running on Port ${PORT}`);
});

// Mount Routes
app.use('/api/users', userRoutes);
 app.use('/api/friends', friendsRoute);
 app.use('/api/files', fileRoutes);

// Upload
app.use('/api/uploads*', (req, res, next) => {
  try {
    res.sendFile(__dirname + '/uploads' + req.params[0]);
    

  } catch (error) {
    next();
  }
});

app.use('/api/uploadedfiles*', (req, res, next) => {
  try {
    res.sendFile(__dirname + '/uploadedfiles' + req.params[0]);
    

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