const express = require('express');
const app = express();

const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const flash = require('express-flash');
const session = require('express-session');

dotenv.config();
const PORT = process.env.PORT || 3000;

const authRouter = require('./routes/auth_route');
const resetPasswordRouter = require('./routes/reset_password_route');
const ticketRouter = require('./routes/ticket_route');

app.set('view engine', 'ejs');

//-----------------Serve static files from the 'views' directory------------------
app.use('/styles', express.static(path.join(__dirname, 'views', 'styles')));
app.use('/script', express.static(path.join(__dirname, 'views', 'script')));
//--------------------------------------------------------------------------------

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }
));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//app.use(bodyParser.json());

//------------ Connection to database----------------------------------
mongoose.connect(process.env.CLOUD_MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
//---------------------------------------------------------------------

//-------------Auth and Reset password routes--------------------------
app.use('/', authRouter);
app.use('/', resetPasswordRouter);
app.use('/', ticketRouter);
//---------------------------------------------------------------------


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
