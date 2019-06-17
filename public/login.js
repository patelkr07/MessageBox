
var passport = require('passport')

, LocalStrategy = require('passport-local').Strategy;

passport.use(new Localstrategy(

    function(username, password, done) {

        User.findOne ({ username: username}, function(err, user) {

            if(err) { return done(err); }

            if (!user) {

                return done(null, false, { message: 'Incorrect username.' });
            }

            if (!user.validPassword(password)) {

                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);

        });

    }
));  

app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                     failureRedirect: '/login',
                                     failureFlash: true } )

);

                                     


    