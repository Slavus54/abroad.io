const {Schema, model} = require('mongoose') 

const Persons = new Schema({
    shortid: String,
    account_id: String,
    creator: String,
    fullname: String,
    category: String,
    country: String,
    cords: {
        lat: Number,
        long: Number
    },
    main_photo: String,
    facts: [{
        shortid: String,
        name: String,
        content: String,
        occupation: String,
        isTrue: Boolean
    }],
    quotes: [{
        shortid: String,
        name: String,
        text: String,
        category: String,
        likes: Number
    }],
    pictures: [{
        shortid: String,
        name: String,
        label: String,
        photo_item: String,
        year: Number
    }]
})

module.exports = model('Persons', Persons)