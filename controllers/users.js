const User =require("../models/user.js");
module.exports.renderSignUp= (req, res) => {
    res.render("./users/signup.ejs");

    }
module.exports.signUp = async (req, res, next) => {
    try {
        let { username,email, password } = req.body;
        const newUser = new User({ email,username }); // Only use email for registration
        
        const registeredUser = await User.register(newUser, password);
        
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', `Welcome to RestX, ${registeredUser.email.split('@')[0]}!`);
            res.redirect('/listings');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
};
module.exports.renderLogin = (req, res) => {
    res.render("./users/login.ejs");
}
module.exports.login =async (req, res) => {     
    console.log("Login successful! User object:", req.user); // Add this line
    
    // Create a personalized name from the email
    const username = req.user.email.split('@')[0];
    console.log("Username for flash message:", username); // Add this line
    
    req.flash('success', `Welcome back, ${username}!`);

        let redirectUrl = res.locals.redirectUrl || '/listings'; 
        delete req.session.redirectUrl;
        res.redirect(redirectUrl);
    }
module.exports.logout = (req, res, next) => { 
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged out successfully!');
        res.redirect('/login');
    });
}

