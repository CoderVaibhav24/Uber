const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullName:{
        firstName: {
            type: String,
            required: true,
            minlength: [2, 'First name must be at least 2 characters long'],
        },
        lastName: {
            type: String,
            minlength: [2, 'Last name must be at least 2 characters long'],
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [8, 'Password must be at least 8 characters long'],
    },  
    socketId: {
        type: String
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    vehicles: [{
        color:{
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },
        plate:{
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^[A-Z0-9]{1,7}$/.test(v);
                },
                message: props => `${props.value} is not a valid plate number!`
            }
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        },
        location:{
            lat:{
                type: Number
            },
            lng:{
                type: Number
            }
        }
    }]
});


captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;   
}

captainSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

captainSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel; 