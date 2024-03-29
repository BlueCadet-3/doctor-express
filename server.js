const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const compression = require('compression');
const helmet = require('helmet');
const session = require("cookie-session");
const passport = require("passport");
const methodOverride = require("method-override");
const favicon = require("serve-favicon");

// Always process the .env file early
require("dotenv").config();
// Run the database configuration code
require("./config/db");
// Run the passport configuration code
require("./config/passport");

const rootRouter = require("./routes/root");
const authRouter = require("./routes/auth");
const doctorsRouter = require('./routes/doctors');
const medicationsRouter = require("./routes/medications");
const notesRouter = require("./routes/notes");
const patientsRouter = require("./routes/patients");
const usersRouter = require("./routes/users");

const app = express();
app.set('trust proxy', true);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(compression({ filter: shouldCompress }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 15,
    cookie: {
      secure: true
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// relieves from having to pass user: req.user every time a view is rendered
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use("/", rootRouter);
app.use("/auth", authRouter);
app.use("/", medicationsRouter);
app.use("/", notesRouter);
app.use("/users/patients", patientsRouter);
app.use("/users/doctors", doctorsRouter);
app.use("/users", usersRouter);

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
  res.render("error/error");
});

// should compress filter
function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

module.exports = app;
