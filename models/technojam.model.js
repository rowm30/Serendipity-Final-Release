const mongoose = require('mongoose');

var technojamMembers = mongoose.model('TJMembers',{
    name:{type:String},
    batch:{type:String},
    role:{type:String},
    votes:{type:Number},
},'technojam')

module.exports = {technojamMembers};