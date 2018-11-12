/**
 * создаём пустой объект api, в котором сохраним все необходимые методы.
 * В метод login сначала передаём аргумент User, так как тут нужен метод
 * для доступа к модели User, затем передаём аргументы req и resp.
 */
const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    config = require('@config');

const api = {};

/**
 * Этот метод выполняет поиск объекта User, который соответствует 
 * имени пользователя (username). Если имя пользователя распознать
 * не удаётся, выдаём ошибку, в противном случае проверяем пароль
 * и токен, привязанные к пользователю.
 * @param {*} User 
 */
api.login = (User) => (req, resp) => {
    User.findOne({username: req.body.username}, (error, user) => {
        if (error) throw error;
        if (!user) resp.status(401).send({
            success: false,
            message: 'Authentication failed. User not found'
        }
    );
    else {
        user.comparePassword(req.body.password, (error, matches) => {
            if (matches && !error) {
                const token = jwt.sign({ user }, config.secret);
                resp.json({success: true, message: 'Token granted', token});
            }
            else {
                resp.status(401).send({success: false, message: 'Authentication failed. Wrong password'});
            }
        });
    }
    });
};

/**
 * Этот метод проверяет заголовки и получает заголовок Authorization
 */
api.verify = headers => {
    if (headers && headers.authorization) {
        const split = headers.authorization.split(' ');
        if (split.length === 2) return split[1];
        else return null;
    }
    else {
        return null;
    }
};

module.exports = api;