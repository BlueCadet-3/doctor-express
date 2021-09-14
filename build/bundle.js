/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var createError = __webpack_require__(/*! http-errors */ \"http-errors\");\nvar express = __webpack_require__(/*! express */ \"express\");\nvar path = __webpack_require__(/*! path */ \"path\");\nvar cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\nvar logger = __webpack_require__(/*! morgan */ \"morgan\");\nvar session = __webpack_require__(/*! express-session */ \"express-session\");\nvar passport = __webpack_require__(/*! passport */ \"passport\");\nvar methodOverride = __webpack_require__(/*! method-override */ \"method-override\");\nvar favicon = __webpack_require__(/*! serve-favicon */ \"serve-favicon\");\n// Always process the .env file early\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n// Run the database configuration code\n__webpack_require__(/*! ./config/database */ \"./src/config/database.js\");\n// Run the passport configuration code\n__webpack_require__(/*! ./config/passport */ \"./src/config/passport.js\");\nvar indexRouter = __webpack_require__(/*! ./routes/index */ \"./src/routes/index.js\");\nvar usersRouter = __webpack_require__(/*! ./routes/users */ \"./src/routes/users.js\");\nvar patientsRouter = __webpack_require__(/*! ./routes/patients */ \"./src/routes/patients.js\");\nvar notesRouter = __webpack_require__(/*! ./routes/notes */ \"./src/routes/notes.js\");\nvar medicationsRouter = __webpack_require__(/*! ./routes/medications */ \"./src/routes/medications.js\");\nvar app = express();\n// view engine setup\napp.set(\"views\", path.join(__dirname, \"views\"));\napp.set(\"view engine\", \"ejs\");\napp.use(logger(\"dev\"));\napp.use(express.json());\napp.use(express.urlencoded({ extended: false }));\napp.use(cookieParser());\napp.use(express.static(path.join(__dirname, \"public\")));\napp.use(methodOverride(\"_method\"));\napp.use(favicon(path.join(__dirname, \"public\", \"favicon.ico\")));\napp.use(session({\n    secret: \"SEIRocks!!!\",\n    resave: false,\n    saveUninitialized: true,\n}));\napp.use(passport.initialize());\napp.use(passport.session());\n// relieves from having to pass user: req.user every time a view is rendered\napp.use(function (req, res, next) {\n    res.locals.user = req.user;\n    next();\n});\napp.use(\"/\", indexRouter);\napp.use(\"/users\", usersRouter);\napp.use(\"/patients\", patientsRouter);\napp.use(\"/\", notesRouter);\napp.use(\"/\", medicationsRouter);\n// catch 404 and forward to error handler\napp.use(function (_req, _res, next) {\n    next(createError(404));\n});\n// error handler\napp.use(function (err, req, res, _next) {\n    // set locals, only providing error in development\n    res.locals.message = err.message;\n    res.locals.error = req.app.get(\"env\") === \"development\" ? err : {};\n    // render the error page\n    res.status(err.status || 500);\n    res.render(\"error\");\n});\nmodule.exports = app;\n\n\n//# sourceURL=webpack://doctor-express/./src/server.ts?");

/***/ }),

/***/ "./src/config/database.js":
/*!********************************!*\
  !*** ./src/config/database.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\n\r\nmongoose.connect(\"mongodb+srv://InternetPolice:EPGxKbJO8NMtZFmZ@sei.wahub.mongodb.net/doctor-express?authSource=admin&replicaSet=atlas-zisc1k-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true\", {\r\n  useNewUrlParser: true,\r\n  useCreateIndex: true,\r\n  useUnifiedTopology: true\r\n});\r\n\r\n// shortcut to mongoose.connection object\r\nconst db = mongoose.connection;\r\n\r\ndb.on('connected', function () {\r\n  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);\r\n});\r\n\n\n//# sourceURL=webpack://doctor-express/./src/config/database.js?");

/***/ }),

/***/ "./src/config/passport.js":
/*!********************************!*\
  !*** ./src/config/passport.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const passport = __webpack_require__(/*! passport */ \"passport\");\r\nconst GoogleStrategy = __webpack_require__(/*! passport-google-oauth */ \"passport-google-oauth\").OAuth2Strategy;\r\nconst User = __webpack_require__(/*! ../models/user */ \"./src/models/user.js\");\r\n\r\npassport.use(\r\n  new GoogleStrategy(\r\n    {\r\n      clientID: \"292129752757-5u1657i9g7dr3joa3k4ajr1g7g6ribie.apps.googleusercontent.com\",\r\n      clientSecret: \"xpPifVY7MYQqd67UyH7EWFf4\",\r\n      callbackURL: \"http://localhost:3200/oauth2callback\"\r\n    },\r\n    // The verify callback function\r\n    function(accessToken, refreshToken, profile, cb) {\r\n      // A user has logged in with OAuth...\r\n      User.findOne({googleId: profile.id}).then(async function(user) {\r\n        if (user) return cb(null, user);\r\n        // We have a new user via OAuth!\r\n        try {\r\n          user = await User.create({\r\n            name: profile.displayName,\r\n            googleId: profile.id,\r\n            email: profile.emails[0].value,\r\n            avatar: profile.photos[0].value\r\n          });\r\n          return cb(null, user);\r\n        } catch (err) {\r\n          cb(err);\r\n        }\r\n      });\r\n    }\r\n  )\r\n);\r\n\r\npassport.serializeUser(function(user, cb) {\r\n  cb(null, user._id);\r\n});\r\n\r\npassport.deserializeUser(function(userId, cb) {\r\n  User.findById(userId).then(function(user) {\r\n    cb(null, user);\r\n  });\r\n});\n\n//# sourceURL=webpack://doctor-express/./src/config/passport.js?");

/***/ }),

/***/ "./src/controllers/medications.js":
/*!****************************************!*\
  !*** ./src/controllers/medications.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Patient = __webpack_require__(/*! ../models/patient */ \"./src/models/patient.js\");\r\n\r\nmodule.exports = {\r\n  create,\r\n  delete: deleteMedication\r\n};\r\n\r\nfunction create (req, res) {\r\n  Patient.findById(req.params.id, function (err, patient) {\r\n    req.body.user = req.user.id;\r\n    req.body.userName = req.user.name;\r\n    req.body.userAvatar = req.user.avatar;\r\n    patient.medications.push(req.body);\r\n    patient.save(function (err) {\r\n      res.redirect(`/patients/${patient._id}`);\r\n    });\r\n  });\r\n}\r\n\r\nfunction deleteMedication (req, res, next) {\r\n  Patient.findOne({ 'medications._id': req.params.id })\r\n    .then(function (patient) {\r\n      const medication = patient.medications.id(req.params.id);\r\n      if (!medication.user.equals(req.user._id)) return res.redirect(`/patients/${patient._id}`);\r\n      medication.remove();\r\n      patient.save().then(function () {\r\n        res.redirect(`/patients/${patient._id}`);\r\n      }).catch(function (err) {\r\n        return next(err);\r\n      });\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack://doctor-express/./src/controllers/medications.js?");

/***/ }),

/***/ "./src/controllers/notes.js":
/*!**********************************!*\
  !*** ./src/controllers/notes.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Patient = __webpack_require__(/*! ../models/patient */ \"./src/models/patient.js\");\r\n\r\nmodule.exports = {\r\n  create,\r\n  update,\r\n  delete: deleteNote\r\n};\r\n\r\nfunction create(req, res) {\r\n  Patient.findById(req.params.id, function(err, patient) {\r\n    req.body.user = req.user._id;\r\n    req.body.userName = req.user.name;\r\n    req.body.userAvatar = req.user.avatar;\r\n    patient.notes.push(req.body);\r\n    patient.save(function(err) {\r\n      res.redirect(`/patients/${patient._id}`);\r\n    });\r\n  });\r\n}\r\n\r\nfunction update(req, res) {\r\n  // Using dot syntax to query on the property of a subdoc\r\n  Patient.findOne({'notes._id': req.params.id}, function(err, patient) {\r\n    // Find the comment subdoc using the id method on Mongoose arrays\r\n    const noteSubdoc = patient.notes.id(req.params.id);\r\n    // Ensure that the comment was created by the logged in user\r\n    // if(!noteSubdoc.userId.equals(req.user._id)) return res.redirect(`/patients/${patient._id}`);\r\n    // Update the text of the comment\r\n    noteSubdoc.note = req.body.text;\r\n    // Save the updated patient\r\n    patient.save(function(err) {\r\n      // Redirect back to the patient's show view\r\n      res.redirect(`/patients/${patient._id}`);\r\n    });\r\n  });\r\n}\r\n\r\nfunction deleteNote(req, res, next) {\r\n  Patient.findOne({'notes._id': req.params.id})\r\n  .then(function(patient) {\r\n    const note = patient.notes.id(req.params.id);\r\n    if(!note.user.equals(req.user.id)) return res.redirect(`/patients/${patient._id}`);\r\n    note.remove();\r\n    patient.save().then(function() {\r\n      res.redirect(`/patients/${patient._id}`);\r\n    }).catch(function(err) {\r\n      return next(err);\r\n    });\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack://doctor-express/./src/controllers/notes.js?");

/***/ }),

/***/ "./src/controllers/patients.js":
/*!*************************************!*\
  !*** ./src/controllers/patients.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const User = __webpack_require__(/*! ../models/user */ \"./src/models/user.js\");\r\nconst Patient = __webpack_require__(/*! ../models/patient */ \"./src/models/patient.js\");\r\n\r\nmodule.exports = {\r\n  create,\r\n  show\r\n}\r\n\r\nfunction create(req, res) {\r\n  req.body.user = req.user._id;\r\n  const patient = new Patient(req.body);\r\n  patient.save(function(err) {\r\n    if(err) return res.render('patients/new');\r\n    res.redirect(`patients/${patient._id}`);\r\n  });\r\n}\r\n\r\nfunction show(req, res) {\r\n  Patient.find({ user: req.user._id }, function(err, patients) {\r\n    if(!patients.length) {\r\n      res.render('patients/new', { title: 'New Patient' })\r\n    } else {\r\n        res.render('patients/show', {\r\n          title: 'Patient Portal - Doctor Express',\r\n          patient: patients[0]\r\n        })\r\n    }\r\n  })\r\n}\r\n\n\n//# sourceURL=webpack://doctor-express/./src/controllers/patients.js?");

/***/ }),

/***/ "./src/models/patient.js":
/*!*******************************!*\
  !*** ./src/models/patient.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst Schema = mongoose.Schema;\r\n\r\nconst medicationSchema = new Schema({\r\n  user: {\r\n    type: Schema.Types.ObjectId, \r\n    ref: 'User'\r\n  },\r\n  name: String,\r\n  dosage: String,\r\n  frequency: String,\r\n  notes: String\r\n}, {\r\n  timestamps: true\r\n});\r\n\r\nconst noteSchema = new Schema({\r\n  user: {\r\n    type: Schema.Types.ObjectId, \r\n    ref: 'User'\r\n  },\r\n  note: String\r\n}, {\r\n  timestamps: true\r\n});\r\n\r\nconst patientSchema = new Schema({\r\n  user: {\r\n    type: Schema.Types.ObjectId,\r\n    ref: 'User'\r\n  },\r\n  firstName: String,\r\n  lastName: String,\r\n  birthDate: Date,\r\n  height: Number,\r\n  weight: Number,\r\n  bloodType: String,\r\n  medications: [medicationSchema],\r\n  notes: [noteSchema]\r\n}, {\r\n  timestamps: true\r\n});\r\n\r\nmodule.exports = mongoose.model('Patient', patientSchema);\r\n\n\n//# sourceURL=webpack://doctor-express/./src/models/patient.js?");

/***/ }),

/***/ "./src/models/user.js":
/*!****************************!*\
  !*** ./src/models/user.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\r\nconst Schema = mongoose.Schema;\r\n\r\nconst userSchema = new Schema({\r\n  name: String,\r\n  googleId: {\r\n    type: String,\r\n    required: true\r\n  },\r\n  email: String,\r\n  avatar: String\r\n}, {\r\n  timestamps: true\r\n});\r\n\r\nmodule.exports = mongoose.model('User', userSchema);\r\n\n\n//# sourceURL=webpack://doctor-express/./src/models/user.js?");

/***/ }),

/***/ "./src/routes/index.js":
/*!*****************************!*\
  !*** ./src/routes/index.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\r\nvar router = express.Router();\r\n\r\nconst passport = __webpack_require__(/*! passport */ \"passport\");\r\nconst patient = __webpack_require__(/*! ../models/patient */ \"./src/models/patient.js\");\r\nconst user = __webpack_require__(/*! ../models/user */ \"./src/models/user.js\");\r\n\r\n/* GET home page. */\r\nrouter.get('/', function(req, res, next) {\r\n  res.render('index', { title: 'Doctor Express' });\r\n});\r\n\r\n// Google OAuth login route\r\nrouter.get('/auth/google', passport.authenticate( \r\n  'google',\r\n  { scope: ['profile', 'email'] }\r\n));\r\n\r\n// Google OAuth callback route\r\nrouter.get('/oauth2callback', passport.authenticate(\r\n    'google',\r\n    {\r\n      successRedirect: `/patients/show`,\r\n      failureRedirect: '/'\r\n    }\r\n  )\r\n);  \r\n\r\n// Google OAuth logout route\r\nrouter.get('/logout', function(req, res) {\r\n  req.logout();\r\n  res.redirect('/');\r\n});\r\n\r\nmodule.exports = router; \r\n\n\n//# sourceURL=webpack://doctor-express/./src/routes/index.js?");

/***/ }),

/***/ "./src/routes/medications.js":
/*!***********************************!*\
  !*** ./src/routes/medications.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\r\nconst router = express.Router();\r\n\r\nconst medicationsCtrl = __webpack_require__(/*! ../controllers/medications */ \"./src/controllers/medications.js\");\r\n\r\nrouter.post('/patients/:id/medications', medicationsCtrl.create);\r\nrouter.delete('/medications/:id', medicationsCtrl.delete);\r\n\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack://doctor-express/./src/routes/medications.js?");

/***/ }),

/***/ "./src/routes/notes.js":
/*!*****************************!*\
  !*** ./src/routes/notes.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\r\nconst router = express.Router();\r\n\r\nconst notesCtrl = __webpack_require__(/*! ../controllers/notes */ \"./src/controllers/notes.js\");\r\n\r\nrouter.post('/patients/:id/notes', notesCtrl.create);\r\nrouter.delete('/notes/:id', notesCtrl.delete);\r\nrouter.put('/notes/:id', notesCtrl.update);\r\n\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack://doctor-express/./src/routes/notes.js?");

/***/ }),

/***/ "./src/routes/patients.js":
/*!********************************!*\
  !*** ./src/routes/patients.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\r\nconst router = express.Router();\r\n\r\nconst patientsCtrl = __webpack_require__(/*! ../controllers/patients */ \"./src/controllers/patients.js\");\r\n\r\nrouter.post('/', patientsCtrl.create);\r\nrouter.get('/:id', patientsCtrl.show);\r\n\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack://doctor-express/./src/routes/patients.js?");

/***/ }),

/***/ "./src/routes/users.js":
/*!*****************************!*\
  !*** ./src/routes/users.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\r\nconst router = express.Router();\r\n\r\n/* GET users listing. */\r\nrouter.get('/', function(req, res, next) {\r\n  res.send('respond with a resource');\r\n});\r\n\r\nmodule.exports = router;\r\n\n\n//# sourceURL=webpack://doctor-express/./src/routes/users.js?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("express-session");

/***/ }),

/***/ "http-errors":
/*!******************************!*\
  !*** external "http-errors" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("http-errors");

/***/ }),

/***/ "method-override":
/*!**********************************!*\
  !*** external "method-override" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("method-override");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("morgan");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("passport");

/***/ }),

/***/ "passport-google-oauth":
/*!****************************************!*\
  !*** external "passport-google-oauth" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("passport-google-oauth");

/***/ }),

/***/ "serve-favicon":
/*!********************************!*\
  !*** external "serve-favicon" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("serve-favicon");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.ts");
/******/ 	
/******/ })()
;