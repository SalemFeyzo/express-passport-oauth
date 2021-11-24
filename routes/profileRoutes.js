const router = require("express").Router()

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("/auth/login")
  } else {
    next()
  }
}

router.get("/", authCheck, (req, res) => {
  //res.send(`you are logged in as ${req.user.firstName} ${req.user.lastName}`)
  res.render("profile", { user: req.user })
})

module.exports = router
