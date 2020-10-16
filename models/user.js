const { Schema, model } = require('mongoose');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minlength: [6, 'name should be at least 6 characters'],
        maxlength: [256, 'name must be at most 256 characters'],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: [validator.isEmail, 'please provide a valid email']
    },
    age: {
        type: Number,
        min: [18, 'you have to be up to 18 years of age']
    },
    password: {
        type: String,
        minlength: [8, 'password must be at least 8 characters'],
        required: [true, 'please provide the password']
    },
    passwordConfirm: {
        type: String,
        required: [true, 'password confirm field is required'],
        validate: {
            validator: function (val) {
                return this.password === val
            },
            message: 'passwords must match'
        }
    },
    role: {
        type: String,
        default: 'customer',
        select: false,
        enum: ['admin', 'super-admin', 'cook', 'customer']
    }
})

// Document Query
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.isNew) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordConfirm = undefined;
    next();
});

// query middleware
userSchema.pre(/^find/, function (next) {
    this.select('-__v');
    next();
});


// Instance method
userSchema.methods.confirmPassword = async (userPassword, dbPassword) => {
    return await bcrypt.compare(userPassword, dbPassword);
}

userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id, role: this.role }, 'secret', { expiresIn: '90d' });
}

// userSchema.static('findByEmail', function (email) {
//     return this.findOne({ email });
// })

// userSchema.statics.findByEmail = function (email) {
//     return this.findOne({ email });
// }

module.exports = model('User', userSchema);