const User = require("../models/user.js");
const passport = require('passport');

module.exports.renderSignUp = (req, res) => {
    res.render("./users/signup.ejs");
};

module.exports.signUp = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        
        console.log('Signup attempt:', { username, email }); // Debug log
        
        const newUser = new User({ 
            email: email,
            username: username 
        });
        
        const registeredUser = await User.register(newUser, password);
        console.log('User registered successfully:', registeredUser.email); // Debug log
        
        req.login(registeredUser, (err) => {
            if (err) {
                console.log('Auto-login error:', err); // Debug log
                return next(err);
            }
            req.flash('success', `Welcome to RestX, ${registeredUser.email.split('@')[0]}!`);
            res.redirect('/listings');
        });
    } catch (e) {
        console.log('Signup error:', e.message); // Debug log
        req.flash('error', e.message);
        res.redirect('/signup');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render("./users/login.ejs");
};

// OPTION 1: Simple login (requires passport middleware in routes)
module.exports.login = async (req, res) => {
    console.log("Login successful! User object:", req.user);
    
    // Create a personalized name from the email
    const username = req.user.email.split('@')[0];
    console.log("Username for flash message:", username);
    
    req.flash('success', `Welcome back, ${username}!`);
    
    let redirectUrl = res.locals.redirectUrl || '/listings';
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
};

// OPTION 2: Login with authentication handled in controller
// Use this if you want to handle authentication in the controller instead of routes
module.exports.loginWithAuth = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log('Authentication error:', err);
            return next(err);
        }
        
        if (!user) {
            console.log('Authentication failed:', info);
            req.flash('error', info.message || 'Invalid email or password');
            return res.redirect('/login');
        }
        
        req.logIn(user, (err) => {
            if (err) {
                console.log('Login error:', err);
                return next(err);
            }
            
            console.log("Login successful! User object:", req.user);
            const username = req.user.email.split('@')[0];
            console.log("Username for flash message:", username);
            
            req.flash('success', `Welcome back, ${username}!`);
            
            let redirectUrl = res.locals.redirectUrl || '/listings';
            delete req.session.redirectUrl;
            res.redirect(redirectUrl);
        });
    })(req, res, next);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged out successfully!');
        res.redirect('/login');
    });
};
