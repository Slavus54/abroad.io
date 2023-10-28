const {Schema, model} = require('mongoose') 

const Markets = new Schema({
    shortid: String,
    account_id: String,
    creator: String,
    title: String,
    category: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    main_photo: String,
    weekdays: [String],
    reviews: [{
        shortid: String,
        name: String,
        text: String,
        indicator: String,
        rate: Number
    }],
    stops: [{
        shortid: String,
        name: String,
        title: String,
        category: String,
        waiting_time: Number,
        cords: {
            lat: Number,
            long: Number
        }
    }],
    purchases: [{
        shortid: String,
        name: String,
        change: String,
        volume: Number,
        photo_url: String,
        date: String
    }]
})

module.exports = model('Markets', Markets)