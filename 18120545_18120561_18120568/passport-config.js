const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const userService = require('./models/userServices')

function initialize(passport) {
    const AuthenticateUser = async(email, password, done) => {
        const user = await userService.getUserbyEmail(email);

        if (user == null) {
            return done(null, false, { message: 'No user with that email' })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (error) {
            return done(error)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, AuthenticateUser));

    passport.serializeUser((user, done) => done(null, user.id))

    passport.deserializeUser(async(id, done) => {
        return done(null, await userService.getUserbyID(id))
    })
}

module.exports = initialize