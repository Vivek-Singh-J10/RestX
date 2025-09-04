const passport = require('passport');
const localStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');

// Configure Local Strategy (for username/password login)
passport.use(new localStrategy(User.authenticate()));

// Configure Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
            // If user exists, update their profile and save, then proceed
            user.username = profile.displayName;
            user.email = profile.emails[0].value;
            await user.save();
            done(null, user);
        } else {
            // If user does not exist, create a new one
            user = new User({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value
            });
            await user.save();
            done(null, user);
        }
    } catch (err) {
        done(err, null);
    }
  }
));

// Serialize and deserialize user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());