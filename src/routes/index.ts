const router = express.Router();

/* GET home page. */
router.get(
	"/",
	(
		req: any,
		res: { render: (arg0: string, arg1: { title: string }) => void }
	) => {
		res.render("index", { title: "Doctor Express" });
	}
);

// Google OAuth login route
router.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
	"/oauth2callback",
	passport.authenticate("google", {
		successRedirect: `/patients/show`,
		failureRedirect: "/",
	})
);

// Google OAuth logout route
router.get(
	"/logout",
	(req: { logout: () => void }, res: { redirect: (arg0: string) => void }) => {
		req.logout();
		res.redirect("/");
	}
);

module.exports = router;
