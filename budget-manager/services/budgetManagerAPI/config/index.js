/**
 * Этот файл содержит параметры подключения к базе данных и секретный 
 * ключ, который мы используем для создания JWT-токенов.
 */
module.exports = {
    secret: 'budgetsecret',
    session: false,
    database: 'mongodb://127.0.0.1:27017/budgetmanager'
}