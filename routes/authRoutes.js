const router = require("express").Router()
const passport = require("passport")

const authCheck = (req, res, next) => {
  if (req.user) {
    res.redirect("/profile")
  } else {
    next()
  }
}

//auth login
router.get("/login", authCheck, (req, res) => {
  res.render("login")
})

//auth logout

router.get("/logout", (req, res) => {
  //handle with passport
  req.logOut()
  res.redirect("/")
})

// auth with google

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
)

// callback route for google to redirect to

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  //res.send(req.user)
  res.redirect("/profile")
})

module.exports = router
