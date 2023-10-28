const {Schema, model} = require('mongoose') 

const Areas = new Schema({
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
    security_points: Number,
    threat_state: String,
    locations: [{
        shortid: String,
        name: String,
        title: String,
        category: String,
        cords: {
            lat: Number,
            long: Number
        },
        source: String,
        photo_url: String
    }],
    questions: [{
        shortid: String,
        name: String,
        location: String,
        text: String,
        level: String,
        status: String,
        answers: [String]
    }]
})

module.exports = model('Areas', Areas)