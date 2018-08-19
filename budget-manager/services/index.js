/**
 * Мы начинаем с подключения module_alias,
 * который мы настроим позже (шаг это 
 * необязателен, но такой подход поможет
 * сделать код чище). Если вы решите не
 * использовать пакет module_alias, то 
 * вместо @BudgetManagerAPI надо будет писать 
 * ./services/BudgetManagerAPI/config.
 */
require('module-alias/register');
const http = require('http'),
    budgetManagerAPI = require('@budgetManagerAPI'),
    budgetManagerServer = http.Server(budgetManagerAPI),
    budgetManagerPort = process.env.PORT || 3001,
    LOCAL = '0.0.0.0';
budgetManagerServer.listen(budgetManagerPort, LOCAL, () => console.log(`budgetManagerAPI running on ${budgetManagerPort}`));