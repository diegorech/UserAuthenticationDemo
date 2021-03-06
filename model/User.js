const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required:true,
        max: 2000,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
}, 
{
    timestamps:true
})


module.exports = mongoose.model('user', userSchema)