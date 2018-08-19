/**
 * В строке passportConfig = require('./passport')(passport) мы импортируем 
 * конфигурационный файл для passport, передавая passport в качестве аргумента,
 * так как в passport.js имеется такая команда:
 *  module.exports = (passport) => { ... }
 * Благодаря такому подходу мы можем работать с passport внутри файла passport.js
 * без необходимости подключать его.
 */
const express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        morgan = require('morgan'),
        consign = require('consign'),
        cors = require('cors'),
        passport = require('passport'),
        passportConfig = require('./passport')(passport),
        jwt = require('jsonwebtoken'),
        config = require('./index'),
        database = require('./database')(mongoose, config);

/**
 * начинаем работу с пакетами и устанавливаем секретный ключ
 */
app.use(express.static('.'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
// в качестве альтернативы вместо cors() можно использовать функцию
/**
 * app.use(function(req, resp, next) {
 *    resp.header("Access-Control-Allow-Origin", "*");
 *    resp.header("Access-Control-Allow-Headers", "Origin, 
 * X-Request-With, Content-Type, Accept");
 * next();
 * });
 */
app.use(passport.initialize());
app.set('budgetsecret', config.secret);

/**
 * проверяем, прежде чем выполнять другие действия, загружено
 * ли содержимое папки setup, благодаря чему в первую очередь
 * будет создан экземпляр модели. Затем загружаем методы API,
 * и наконец — маршруты
 */
consign({cwd: 'services'})
.include(budgetManagerAPI/app/setup)
.then(budgetManagerAPI/app/api)
.then(budgetManagerAPI/app/route)
.into(app);

module.exports = app;