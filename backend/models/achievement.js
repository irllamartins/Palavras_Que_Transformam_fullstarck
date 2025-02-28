const mongoose = require('mongoose');
const {Schema} = mongoose

const AchievementSchema = new Schema({
    title: String,
    description: String,
    criteria: [String],
    badgeImage: String 
});

 const AchievementModel = mongoose.model('Achievement', AchievementSchema)
 module.exports = AchievementModel 
