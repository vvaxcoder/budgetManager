/**
 * Здесь мы импортируем библиотеку passport для организации аутентификации, 
 * подключаем конфигурационный файл для настройки параметров сессии, и 
 * подключаем модели, благодаря чему можно будет проверить, имеет ли 
 * пользователь право работать с конечными точками API.
 */
const passport = require('passport'),
      config = require('@config'),
      models = require('@budgetManager/app/setup');
module.exports = (app) => {
  const api = app.budgetManagerAPI.app.api.user;
  app.route('/api/v1/setup')
     .post(api.setup(models.User));
  app.route('/api/v1/users')
     .get(passport.authenticate('jwt', config.session), 
     api.index(models.User, app.get('budgetsecret')));
  app.route('/api/v1/signup')
     .post(api.signup(models.User));
}