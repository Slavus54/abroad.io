const {Schema, model} = require('mongoose') 

const Profiles = new Schema({
    account_id: String,
    username: String,
    password: String,
    region: String,
    cords: {
        lat: Number,
        long: Number
    },
    main_photo: String,
    status: String,
    country: String,
    media: [{
        label: String,
        icon: String,
        url: String
    }],
    posts: [{
        shortid: String,
        text: String,
        category: String,
        images: [String],
        timestamp: Number,
        cords: {
            lat: Number,
            long: Number
        },
        views: Number
    }],
    channels: [{
        account_id: String,
        name: String
    }],
    account_collections: [{
        shortid: String,
        title: String,
        path: String
    }]
})

module.exports = model('Profiles', Profiles)