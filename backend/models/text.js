const mongoose = require("mongoose")
const {Schema} = mongoose

const textSchema = new Schema({
    title:String,
    body:String,
    user_id:String,
    created_at:String,   
    update_at:String,
    number_words:Number,
    achieved_goal:Boolean
})

const TextModel = mongoose.model('Text', textSchema)

module.exports = TextModel
     