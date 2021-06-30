var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
var connectDB = require("./config/mongo");
var flash = require("connect-flash");
var session = require("express-session");
var mongoose = require("mongoose");
var MongoStore = require("connect-mongo");
var passport = require("passport");

//Passport configs
require("./config/passport")(passport);

//Load configs
dotenv.config({ path: "./config/config.env" });
connectDB();

//Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth")(passport);
var minuteRouter = require("./routes/minute")

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Sessions
app.use(
  session({
    secret: process.env.Secret,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({ mongoUrl: process.env.Mongo_URI })
  })
);


//Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.error = req.flash("error");
  next();
});

// parse application/json
app.use(bodyParser.json());

// Body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(form.array())

//@Routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/minute", minuteRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
