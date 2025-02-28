const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    type:String,
    goal:Number,
    point:Number,
    achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }]
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
