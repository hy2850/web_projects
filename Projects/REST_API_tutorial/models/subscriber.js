// DB Schema?
// POST 같은거 날릴 때, 여기 정해진 schema대로 데이터 날려줘야 함
const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    name : { 
        type: String,
        required: true
    },
    subscribedToChannel:{
        type: String,
        required: true
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Subscriber', subscriberSchema)