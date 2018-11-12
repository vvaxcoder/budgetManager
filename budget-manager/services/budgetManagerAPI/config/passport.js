/**
 * создаём экземпляр модели User и находим пользователя,
 * выполняя поиск по JWT-токену, полученному от клиента
 */

const PassportJWT = require("passport-jwt"),
  ExtractJWT = PassportJWT.ExtractJwt,
  Strategy = PassportJWT.Strategy,
  config = require("./index.js"),
  models = require("@budgetManager/app/setup");

module.exports = passport => {
  const User = models.User;
  const parameters = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  };
  passport.use(
    new Strategy(parameters, (payload, done) => {
      User.findOne({ id: payload.id }, (error, user) => {
        if (error) return done(error, false);
        if (user) return done(null, user);
        else done(null, false);
      });
    })
  );

  /*
  without these lines I had got error
  Error: Failed to serialize user into session
  */
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  /*
  without these lines I had got error
  Error: Failed to serialize user into session
  */
};
