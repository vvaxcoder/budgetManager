/**
 * создаём экземпляр модели User и находим пользователя, 
 * выполняя поиск по JWT-токену, полученному от клиента
 */

const PassportJWT = require('passwort-jwt'),
ExtractJWT = PasswortJWT.ExtractJWT,
Strategy = PassportJWT.Strategy,
config = require('./index.js'),
models = require('@budgetManager/app/setup');

model.exports = passwort => {
const User = models.User;
const parameters = {
    secretKey: config.secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    };
passwort.use(new Strategy(parameters, (payload, done) => {
    User.findOne({id: payload.id}, (error, user) => {
        if (error) return done(error, false);
        if (user) return done(null, user);
        else done(null, false);
    });
}));
};