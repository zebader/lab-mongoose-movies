const express        = require("express");
const passportRouter = express.Router();
// Require user model
const User = require('./../models/user')
const Celebrity = require('./../models/celebrity')
// Add bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
// Add passport 
const passport = require('passport');

passportRouter.get('/login' , (req,res,next) =>{
  res.render('passport/login');
})

passportRouter.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  passReqToCallback: true
}));

passportRouter.get('/signup' , (req,res,next) =>{
  res.render('passport/signup');
})

passportRouter.post('/signup' , (req,res,next) =>{
  const { username, password} = req.body;
    
  if (username === "" || password === "") {
    res.render("passport/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
  .then((user) => {
    if (user !== null) {
      res.render("passport/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({ username, password: hashPass });

    newUser.save((err) => {
      if (err) res.render("passport/signup", { message: "Something went wrong" });
      else res.redirect("/");
    });
  })
  .catch(error => next(error))
})

const ensureLogin = require("connect-ensure-login");

passportRouter.get("/celebrities", ensureLogin.ensureLoggedIn(), (req, res) => {
  Celebrity.find({})
  .then( (allTheCelebritiesFromDB) => res.render('celebrities/index', {allTheCelebritiesFromDB} ))
  .catch( (err) => console.log(err));
  /* res.render("celebrities/index", { user: req.user }); */
});

module.exports = passportRouter;