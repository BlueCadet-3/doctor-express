const passport = require('passport');

module.exports = {
	logOut,
	googleLogin,
	googleCallback
};

// Google OAuth logout route
async function logOut (req, res) {
	req.logout();
	res.redirect('/');
};

async function googleLogin (req, res, next) {
	const handler = passport.authenticate('google', { scope: ['profile', 'email'] });
	handler(req, res, next); // https://stackoverflow.com/questions/43834707/passport-authenticate-doesnt-redirect
}

async function googleCallback (req, res, next) {
	const handler = passport.authenticate(
		'google',
		{
			successRedirect: '/users/onboard',
			failureRedirect: '/failure'
		}
	);
	handler(req, res, next);
}
