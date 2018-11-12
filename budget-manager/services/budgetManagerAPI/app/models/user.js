/**
 * Создадим модель User, которая будет использоваться для JWT-аутентификации.
 */
const mongoose = require('mongoose'), bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    clients: [{}]
});

Schema.pre('save', function(next) {
    const user = this;
    if(this.isModified('password') || this.isNew) {
        bcryptjs.genSalt(13, (error, salt) => {
            if(error) return next(error);
            bcryptjs.hash(user.password, salt, (error, hash) => {
                if(error) return next(error);
                user.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});

Schema.methods.comparePassword = function(password, callback) {
    bcryptjs.compare(password, this.password, (error, matches) => {
        if(error) return callback(error);
        callback(null, matches);
    });
}

mongoose.model('User', Schema);