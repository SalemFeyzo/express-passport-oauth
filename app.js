const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const connectDB = require("./config/connectDB")()
const passportSetup = require("./config/passportSetup")
const authRoutes = require("./routes/authRoutes")
const profileRoutes = require("./routes/profileRoutes")
const cookieSession = require("cookie-session")
const passport = require("passport")

const app = express()

app.set("view engine", "ejs")

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_KEY],
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", authRoutes)

app.use("/profile", profileRoutes)

app.get("/", (req, res) => {
  res.render("home", { user: req.user })
})

app.listen(3000, () =>
  console.log("server is running on http://localhost:3000")
)
