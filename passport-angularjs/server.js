const express = require('express');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 1
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy(
    (username, password, done) => {
        if (username === 'jonaspohren' && password === 'jonaspohren') {
            return done(null, {id: 1});
        }

        return done(null, false, {errorMessage: 'Invalid credentials'});
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    done(null, {id: 1});
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            return next(error);
        }

        if (!user) {
            return res.json(info);
        }

        req.login(user, error => {
            if (error) {
                return next(error);
            }

            return res.json(user);
        });
    })(req, res, next);
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.get('/profile', (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.json({name: 'Jonas Pohren'});
    }

    res.sendStatus(401);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});