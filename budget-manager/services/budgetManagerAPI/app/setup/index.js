/**
 * Делаем мы это для того, чтобы обеспечить загрузку моделей до того, как в
 * приложении будет загружено что-то другое.
 */
const mongoose = require('mongoose'),
    UserModel = require('@budgetManagerModels/user');
const models = {
    User: mongoose.model('User')
};

module.exports = models;