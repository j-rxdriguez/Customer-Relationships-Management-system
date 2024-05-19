//require
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const createError = require('http-errors');
const flash = require('connect-flash');
const passport = require('passport');
const User = require('./models/User');

// Import routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const productsRouter = require('./routes/products');

// Initialize express app
const app = express();

// Database connection
mongoose.connect('mongodb://localhost:27017/myDatabase')
.then(() => console.log('Connected to the database'))
.catch(err => console.error('Error connecting to the database:', err));

// Set up passport
require('./config/passport')(passport);

// Express application setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Local variables middleware for flash messages
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Redirect to choose login type by default
app.get('/', (req, res) => {
  res.redirect('/choose-login');
});

// Routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter); 
app.use('/products', productsRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app
module.exports = app;
