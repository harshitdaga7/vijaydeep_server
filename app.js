var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt_middleware = require('./middleware/jwt')
const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var userRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var productsRouter = require('./routes/products');
var newsRouter = require('./routes/news');
var contactRouter = require('./routes/contact');
var teamRouter = require('./routes/team');
var consoleRouter = require('./routes/console');
var apiRouter = require('./routes/api')



const { json } = require('express/lib/response');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// jwt middleware

app.use(jwt_middleware);

/**
 * Routes :
 * "/"
 * "/about"
 * "/products"
 * "/news"
 * "/contact"
 * "/team"
 * "/auth"
 * "/console"
 * "/user"
 */


app.use('/', indexRouter);

app.use('/auth',authRouter);
app.use('/about',aboutRouter);
app.use('/products',productsRouter);
app.use('/news',newsRouter);
app.use('/contact',contactRouter);
app.use('/team',teamRouter);
app.use('/console', consoleRouter);
app.use('/user',userRouter)
app.use('/api',apiRouter)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
