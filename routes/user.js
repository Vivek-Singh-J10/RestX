const express = require('express');
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveredirectUser } = require('../middleware.js');

const userController=require("../controllers/users.js");
 
// Route to start the Google authentication flow
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Route that Google redirects to after login
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/listings');
  }
);
router.route('/signup')
.get(userController.renderSignUp)
.post(wrapAsync(userController.signUp));

router.route('/login')
.get(userController.renderLogin)
.post(
    saveredirectUser, // Sets res.locals.redirectUrl if available
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true,
    }),userController.login);
router.get('/logout',userController.logout);

 
module.exports = router;