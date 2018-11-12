const mongoose = require('mongoose');
const api = {};
/**
 * Метод setup позволяет создать учётную запись администратора, 
 * нужную для отладочных целей. В готовом приложении этой учётной
 * записи быть не должно
 * @param {*} User 
 */
api.setup = (User) => (req, resp) => {
    const admin = new User({
        username: 'admin',
        password: 'admin',
        clients: []
    });
    admin.save(error => {
        if (error) throw error;
        console.log('Admin account was successfully set up');
        resp.json({success: true});
    });
};

/**
 * создадим метод, применяемый для тестовых целей, позволяющий 
 * вывести список всех пользователей, которые зарегистрировались
 * в приложении, и нужный для проверки механизмов аутентификации
 */
api.index = (User, BudgetToken) => (req, resp) => {
    const token = BudgetToken;
    if (token) {
        User.find({}, (error, users) => {
            if (error) throw error;
            resp.status(200).json(users);
        });
    }
    else {
        return resp.status(403).send({success: false, message: 'Unauthorized'});
    }
};

/**
 * Cоздадим метод signup, который понадобится позже. Он предназначен для регистрации
 * новых пользователей.
 * проверяется, при попытке регистрации нового пользователя, заполнены ли поля
 * username и password, а если это так, то, при условии, что введено допустимое 
 * имя пользователя, создаётся новый пользователь
 */
api.signup = User => (req, resp) => {
    if (!req.body.username || !req.body.password) resp.status(400)
    .send({success: false, message: 'Fill the username and password'});
    else {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            clients: []
        });
        newUser.save(error => {
            if (error) resp.status(400).send({success: false, message: 'Username already exists.'});
            resp.status(200).send({success: true, message: 'Account created successfully'})
        });
    }
};

module.exports = api;