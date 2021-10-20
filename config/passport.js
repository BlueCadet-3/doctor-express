const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK
		},
		// The verify callback function
		async function (accessToken, refreshToken, profile, done) {
			const exists = await userExists(profile);
			if (exists === true) {
				const user = await findUser(profile);
				return done(null, user);
			} else {
				const user = await createUser(profile);
				return done(null, user);
			}
		}
	));

async function userExists (profile) {
	const user = await User.exists({ email: profile.emails[0].value });
	console.log(":::userExists", user);
	console.log(":::userExists", profile.emails[0].value);
	return user;
}

async function findUser (profile) {
	const user = await User.findOne({ email: profile.emails[0].value });
	return user;
}

async function createUser (profile) {
	// http://www.passportjs.org/docs/profile/
	const user = await User.create({
		auth: {
			avatar: profile.photos[0].value,
			provider: profile.provider,
			id: profile.id,
			verified: profile.emails[0].verified
		},
		email: profile.emails[0].value,
		name: {
			first: profile.name.givenName,
			last: profile.name.familyName,
			display: profile.displayName,
		},
		onboard: false
	});
	return user;
}

passport.serializeUser(function (user, cb) {
	cb(null, user._id);
});

passport.deserializeUser(function (userId, cb) {
	User.findById(userId).then(function (user) {
		cb(null, user);
	});
});
