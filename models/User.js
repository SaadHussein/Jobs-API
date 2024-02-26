const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must Provide Name'],
        maxLength: 50,
        minLength: 3

    },
    email: {
        type: String,
        required: [true, 'Must Provide Email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please Peovide a valid Email'],
        unique: true

    },
    password: {
        type: String,
        required: [true, 'Must Provide Password'],
        minLength: 6
    }
});

UserSchema.pre('save', async () => {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = () => {
    return jwt.sign({ userID: this._id, name: this.name }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_LIFETIME
    });
};

UserSchema.methods.comparePassword = async (canditatePassword) => {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model('User', UserSchema);