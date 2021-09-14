var router = express.Router();
/* GET home page. */
router.get("/", function (_req, res) {
    res.render("index", { title: "Doctor Express" });
});
// Google OAuth login route
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
// Google OAuth callback route
router.get("/oauth2callback", passport.authenticate("google", {
    successRedirect: "/patients/show",
    failureRedirect: "/",
}));
// Google OAuth logout route
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});
module.exports = router;
