const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const favicon = require("serve-favicon");

// Always process the .env file early
require("dotenv").config();
// Run the database configuration code
require("./config/database");
// Run the passport configuration code
require("./config/passport");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const patientsRouter = require("./routes/patients");
const notesRouter = require("./routes/notes");
const medicationsRouter = require("./routes/medications");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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
	})
);

app.use(passport.initialize());
app.use(passport.session());

// relieves from having to pass user: req.user every time a view is rendered
app.use(function (
	req: { user: any },
	res: { locals: { user: any } },
	next: () => void
) {
	res.locals.user = req.user;
	next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/patients", patientsRouter);
app.use("/", notesRouter);
app.use("/", medicationsRouter);

// catch 404 and forward to error handler
app.use(function (_req: any, _res: any, next: (arg0: any) => void) {
	next(createError(404));
});

// error handler
app.use(function (
	err: { message: any; status: any },
	req: { app: { get: (arg0: string) => string } },
	res: {
		locals: { message: any; error: any };
		status: (arg0: any) => void;
		render: (arg0: string) => void;
	},
	_next: any
) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
