/**
 * сначала переключили mongoose на использование стандартного объекта Promise.
 * Если этого не сделать, можно столкнуться с предупреждениями, выводимыми 
 * в консоль. Затем мы создали стандартное подключение mongoose
 * @param {*} mongoose 
 * @param {*} config 
 */
module.exports = (mongoose, config) => {
    const database = mongoose.connection;
    mongoose.Promise = Promise;
    mongoose.connect(config.database, {
        useCreateIndex: true,
        useNewUrlParser: true,
        promiseLibrary: global.Promise
    });
    database.on('error', error => console.log(`Connect to budgetManager database failed: ${error}`));
    database.on('connected', () => console.log(`Connected to budgetManager database`));
    database.on('disconected', () => console.log(`Dissconected from budgetManager database`));
    process.on('SIGINT', () => {
        database.close(() => {
            console.log(`budgetManager terminated, connection closed`);
            process.exit(0);
        });
    });
};