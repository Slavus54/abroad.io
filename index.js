const app = require('express')()
const {gql} = require('apollo-server-express')

const PORT = process.env.PORT || 4000

// schemas

const Profiles = require('./schemas/Profiles')
const Areas = require('./schemas/Areas')
const Markets = require('./schemas/Markets')
const Persons = require('./schemas/Persons')

// microservices

const {middleware, mongo_connect, apollo_start, slicer, get_id, generate_pdf} = require('./libs/microservices')

// database url

const url = 'mongodb+srv://Slavus54:ieOUiW5CNwW5gQ5D@west-sib.4lw1a18.mongodb.net/Abroad-IO'

// middlewares

middleware(app)
mongo_connect(url, 'MongoDB is connected...')

const typeDefs = gql`
    type Query {
        test: String!
    }
    type Cord {
        lat: Float!,
        long: Float!
    }
    input ICord {
        lat: Float!,
        long: Float!
    }
    type UserCookie {
        account_id: String!,
        username: String!
    }
    type Media {
        label: String!,
        icon: String!,
        url: String!
    }
    type Post {
        shortid: String!,
        text: String!,
        category: String!,
        images: [String]!,
        timestamp: Float!,
        cords: Cord!,
        views: Float!
    }
    type Channel {
        account_id: String!,
        name: String!
    }
    type AccountCollection {
        shortid: String!,
        title: String!,
        path: String!
    }
    type Location {
        shortid: String!,
        name: String!,
        title: String!,
        category: String!,
        cords: Cord!,
        source: String!,
        photo_url: String!
    }
    type Question {
        shortid: String!,
        name: String!,
        location: String!,
        text: String!,
        level: String!,
        status: String!,
        answers: [String]!
    }
    type Review {
        shortid: String!,
        name: String!,
        text: String!,
        indicator: String!,
        rate: Float!
    }
    type Stop {
        shortid: String!,
        name: String!,
        title: String!,
        category: String!,
        waiting_time: Float!,
        cords: Cord!
    }
    type Purchase {
        shortid: String!,
        name: String!,
        change: String!,
        volume: Float!,
        photo_url: String!,
        date: String!
    }
    type Fact {
        shortid: String!,
        name: String!,
        content: String!,
        occupation: String!,
        isTrue: Boolean!
    }
    type Quote {
        shortid: String!,
        name: String!,
        text: String!,
        category: String!,
        likes: Float!
    }
    type Picture {
        shortid: String!,
        name: String!,
        label: String!,
        photo_item: String!,
        year: Float!
    }
    type Person {
        id: ID!,
        shortid: String!,
        account_id: String!,
        creator: String!,
        fullname: String!,
        category: String!,
        country: String!,
        cords: Cord!,
        main_photo: String!,
        facts: [Fact]!,
        quotes: [Quote]!,
        pictures: [Picture]!
    }
    type Market {
        id: ID!,
        shortid: String!,
        account_id: String!,
        creator: String!,
        title: String!,
        category: String!,
        region: String!,
        cords: Cord!,
        main_photo: String!,
        weekdays: [String]!,
        reviews: [Review]!,
        stops: [Stop]!,
        purchases: [Purchase]!
    }
    type Area {
        id: ID!,
        shortid: String!,
        account_id: String!,
        creator: String!,
        title: String!,
        category: String!,
        region: String!,
        cords: Cord!,
        main_photo: String!,
        security_points: Float!,
        threat_state: String!,
        locations: [Location]!,
        questions: [Question]!
    }
    type Profile {
        account_id: String!,
        username: String!,
        password: String!,
        region: String!,
        cords: Cord!,
        main_photo: String!,
        status: String!,
        country: String!,
        media: [Media]!,
        posts: [Post]!,
        channels: [Channel]!,
        account_collections: [AccountCollection]!
    }
    type Mutation {
        register(username: String!, password: String!, region: String!, cords: ICord!, main_photo: String!, status: String!, country: String!) : UserCookie!
        login(password: String!) : UserCookie!
        getProfiles(username: String!) : [Profile]!
        getProfile(account_id: String!) : Profile!
        updateProfileInfo(account_id: String!, username: String!, cords: ICord!, main_photo: String!, status: String!, country: String!) : String!
        secureProfile(account_id: String!, password: String!) : String!
        manageProfileMedia(account_id: String!, option: String!, label: String!, icon: String!, url: String!) : String!
        manageProfilePost(account_id: String!, option: String!, text: String!, category: String!, images: [String]!, timestamp: Float!, cords: ICord!, coll_id: String!) : String!
        manageProfileChannel(account_id: String!, option: String!, coll_id: String!) : String!
        createArea(username: String!, id: String!, title: String!, category: String!, region: String!, cords: ICord!, main_photo: String!, security_points: Float!, threat_state: String!) : String!
        getAreas(username: String!) : [Area]!
        getArea(username: String!, shortid: String!) : Area!
        manageAreaLocation(username: String!, id: String!, option: String!, title: String!, category: String!, cords: ICord!, source: String!, photo_url: String!, coll_id: String!) : String!
        manageAreaQuestion(username: String!, id: String!, option: String!, location: String!, text: String!, level: String!, coll_id: String!, answer: String!) : String!
        updateAreaPhoto(username: String!, id: String!, main_photo: String!) : String!
        updateAreaSecurity(username: String!, id: String!, security_points: Float!, threat_state: String!) : String!
        makeAreaSubscription(account_id: String!, id: String!) : String!
        createMarket(username: String!, id: String!, title: String!, category: String!, region: String!, cords: ICord!, main_photo: String!, weekdays: [String]!) : String!
        getMarkets(username: String!) : [Market]!
        getMarket(username: String!, shortid: String!) : Market!
        makeMarketReview(username: String!, id: String!, text: String!, indicator: String!, rate: Float!) : String!
        manageMarketStop(username: String!, id: String!, option: String!, title: String!, category: String!, waiting_time: Float!, cords: ICord!, coll_id: String!) : String!
        makeMarketPurchase(username: String!, id: String!, change: String!, volume: Float!, photo_url: String!, date: String!) : String!
        updateMarketPhoto(username: String!, id: String!, main_photo: String!) : String!
        createPerson(username: String!, id: String!, fullname: String!, category: String!, country: String!, cords: ICord!, main_photo: String!) : String!
        getPersons(username: String!) : [Person]!
        getPerson(username: String!, shortid: String!) : Person!
        makePersonFact(username: String!, id: String!, content: String!, occupation: String!, isTrue: Boolean!) : String!
        managePersonQuote(username: String!, id: String!, option: String!, text: String!, category: String!, coll_id: String!) : String!
        makePersonPicture(username: String!, id: String!, label: String!, photo_item: String!, year: Float!) : String!
        updatePersonPhoto(username: String!, id: String!, main_photo: String!) : String!
    }
`

const resolvers = {
    Query: {
        test: () => 'Hi'
    },
    Mutation: {
        register: async (_, {username, password, region, cords, main_photo, status, country}) => {
            await Profiles.deleteMany()
            const profile = await Profiles.findOne({username}) 
            let drop_object = {account_id: '', username: ''}

            if (profile === null) {

                let account_id = get_id()

                const newProfile = new Profiles({
                    account_id,
                    username,
                    password,
                    region,
                    cords,
                    main_photo,
                    status,
                    country,
                    media: [],
                    posts: [],
                    channels: [],
                    account_collections: []
                })

                drop_object = {account_id, username}
            
                await newProfile.save()
            } 
        
            return drop_object
        },
        login: async (_, {password}) => {
            const profile = await Profiles.findOne({password}) 
            let drop_object = {account_id: '', username: ''}

            if (profile !== null) {

                drop_object = {account_id: profile.account_id, username: profile.username}                
            }

            return drop_object
        },
        getProfiles: async (_, {username}) => {
            const profiles = await Profiles.find() 

            return profiles
        },
        getProfile: async (_, {account_id}) => {
            const profile = await Profiles.findOne({account_id}) 
            
            return profile
        },
        updateProfileInfo: async (_, {account_id, username, cords, main_photo, status, country}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                const changed_name = await Profiles.findOne({username}) 

                if (profile.username !== username && !changed_name) {
                    profile.username = username
                }
                
                profile.cords = cords 
                profile.main_photo = main_photo
                profile.status = status
                profile.country = country

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            } 

            return 'Error'
        },
        secureProfile: async (_, {account_id, password}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {

                profile.password = password

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            } 

            return 'Error'
        },
        manageProfileMedia: async (_, {account_id, option, label, icon, url}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
                if (option === 'create') {

                    profile.media = [...profile.media, {
                        label,
                        icon,
                        url
                    }]

                } else {

                    profile.media = profile.media.filter(el => el.label !== label)
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            } 

            return 'Error'
        },
        manageProfilePost: async (_, {account_id, option, text, category, images, timestamp, cords, coll_id}) => {
            const profile = await Profiles.findOne({account_id}) 

            if (profile) {
                if (option === 'create') {

                    let shortid = get_id()

                    profile.posts = [...profile.posts, {
                        shortid,
                        text,
                        category,
                        images,
                        timestamp,
                        cords,
                        views: 0
                    }]

                    profile.posts = slicer(profile.posts, 25)

                } else if (option === 'view') {

                    profile.posts.map(el => {
                        if (el.shortid === coll_id) {
                            el.views += 1
                        }
                    })

                } else {

                    profile.posts = profile.posts.filter(el => el.shortid !== coll_id)
                }

                await Profiles.updateOne({account_id}, {$set: profile})

                return 'Success'
            } 

            return 'Error'
        },
        manageProfileChannel: async (_, {account_id, option, coll_id}) => {
            const profile = await Profiles.findOne({account_id}) 
            const interlocutor = await Profiles.findOne({account_id: coll_id}) 

            if (profile && interlocutor) {
                if (option === 'create') {

                    profile.channels = [...profile.channels, {
                        account_id: interlocutor.account_id,
                        username: interlocutor.username
                    }]

                    interlocutor.channels = [...interlocutor.channels, {
                        account_id: profile.account_id,
                        username: profile.username
                    }]

                } else {

                    profile.channels = profile.channels.filter(el => el.account_id !== interlocutor.account_id)

                    interlocutor.channels = interlocutor.channels.filter(el => el.account_id !== profile.account_id)
                }

                await Profiles.updateOne({account_id}, {$set: profile})
                await Profiles.updateOne({account_id: coll_id}, {$set: interlocutor})

                return 'Success'
            } 

            return 'Error'
        },
        createArea: async (_, {username, id, title, category, region, cords, main_photo, security_points, threat_state}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const area = await Areas.findOne({creator: username, title, category, region, cords})
           
            if (profile && !area) {
                if (profile.account_collections.filter(el => el.path === 'area').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_collections = [...profile.account_collections, {
                        shortid,
                        title,
                        path: 'area'
                    }]

                    const newArea = new Areas({
                        shortid,
                        account_id: profile.account_id,
                        creator: profile.username,
                        title,
                        category,
                        region,
                        cords,
                        main_photo,
                        security_points,
                        threat_state,
                        locations: [],
                        questions: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newArea.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getAreas: async (_, {username}) => {
            const areas = await Areas.find()

            return areas
        },
        getArea: async (_, {username, shortid}) => {
            const area = await Areas.findOne({shortid})

            return area
        },
        manageAreaLocation: async (_, {username, id, option, title, category, cords, source, photo_url, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const area = await Areas.findOne({shortid: id})

            if (profile && area) {
                if (option === 'create') {

                    let shortid = get_id()

                    area.locations = [...area.locations, {
                        shortid,
                        name: profile.username,
                        title,
                        category,
                        cords,
                        source,
                        photo_url
                    }]

                    area.locations = slicer(area.locations, 25)

                } else if (option === 'update') {

                    area.locations.map(el => {
                        if (el.shortid === coll_id) {
                            el.source = source
                            el.photo_url = photo_url
                        }
                    })

                } else {

                    area.locations = area.locations.filter(el => el.shortid !== coll_id)
                }

                await Areas.updateOne({shortid: id}, {$set: area})

                return 'Success'
            }   

            return 'Error'
        },
        manageAreaQuestion: async (_, {username, id, option, location, text, level, coll_id, answer}) => {
            const profile = await Profiles.findOne({username})
            const area = await Areas.findOne({shortid: id})

            if (profile && area) {
                if (option === 'create') {

                    let shortid = get_id()

                    area.questions = [...area.questions, {
                        shortid,
                        name: profile.username,
                        location,
                        text,
                        level,
                        status: profile.status,
                        answers: []
                    }]

                    area.questions = slicer(area.questions, 25)

                } else if (option === 'answer') {

                    area.questions.map(el => {
                        if (el.shortid === coll_id) {
                            el.answers = [...el.answers, answer]
                        }
                    })

                } else {

                    area.questions = area.questions.filter(el => el.shortid !== coll_id)
                }

                await Areas.updateOne({shortid: id}, {$set: area})

                return 'Success'
            }   

            return 'Error'
        },
        updateAreaPhoto: async (_, {username, id, main_photo}) => {
            const profile = await Profiles.findOne({username})
            const area = await Areas.findOne({shortid: id})

            if (profile && area) {

                area.main_photo = main_photo
               
                await Areas.updateOne({shortid: id}, {$set: area})

                return 'Success'
            }   

            return 'Error'
        },
        updateAreaSecurity: async (_, {username, id, security_points, threat_state}) => {
            const profile = await Profiles.findOne({username})
            const area = await Areas.findOne({shortid: id})

            if (profile && area) {

                area.security_points = security_points
                area.threat_state = threat_state
                
                await Areas.updateOne({shortid: id}, {$set: area})

                return 'Success'
            }   

            return 'Error'
        },
        makeAreaSubscription: async (_, {account_id, id}) => {
            const profile = await Profiles.findOne({account_id})
            const area = await Areas.findOne({shortid: id})

            if (profile && area) {

                profile.account_collections = [...profile.account_collections, {
                    shortid: area.shortid,
                    title: area.title,
                    path: 'area'
                }]

                await Profiles.updateOne({account_id: id}, {$set: profile})

                return 'Success'
            }   

            return 'Error'
        },
        createMarket: async (_, {username, id, title, category, region, cords, main_photo, weekdays}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const market = await Markets.findOne({creator: username, title, category, region, cords, weekdays})
        
            if (profile && !market) {
                if (profile.account_collections.filter(el => el.path === 'market').find(el => el.title === title) === undefined) {

                    let shortid = get_id()

                    profile.account_collections = [...profile.account_collections, {
                        shortid,
                        title,
                        path: 'market'
                    }]

                    const newMarket = new Markets({
                        shortid,
                        account_id: profile.account_id,
                        creator: profile.username,
                        title,
                        category,
                        region,
                        cords,
                        main_photo,
                        weekdays,
                        reviews: [],
                        stops: [],
                        purchases: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newMarket.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getMarkets: async (_, {username}) => {
            const markets = await Markets.find()

            return markets
        },
        getMarket: async (_, {username, shortid}) => {
            const market = await Markets.findOne({shortid})

            return market
        },
        makeMarketReview: async (_, {username, id, text, indicator, rate}) => {
            const profile = await Profiles.findOne({username})
            const market = await Markets.findOne({shortid: id})
        
            if (profile && market) {

                let shortid = get_id()

                market.reviews = [...market.reviews, {
                    shortid,
                    name: profile.username,
                    text,
                    indicator,
                    rate
                }]

                market.reviews = slicer(market.reviews, 25)

                await Markets.updateOne({shortid: id}, {$set: market})

                return 'Success'
            }
        
            return 'Error'
        },
        manageMarketStop: async (_, {username, id, option, title, category, waiting_time, cords, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const market = await Markets.findOne({shortid: id})
        
            if (profile && market) {
                if (option === 'create') {

                    let shortid = get_id()

                    market.stops = [...market.stops, {
                        shortid,
                        name: profile.username,
                        title,
                        category,
                        waiting_time,
                        cords
                    }]
                    
                } else if (option === 'update') {

                    market.stops.map(el => {
                        if (el.shortid === coll_id) {
                            el.waiting_time = waiting_time
                        }
                    })

                } else {

                    market.stops = market.stops.filter(el => el.shortid !== coll_id)
                }

                await Markets.updateOne({shortid: id}, {$set: market})

                return 'Success'
            }
        
            return 'Error'
        },
        makeMarketPurchase: async (_, {username, id, change, volume, photo_url, date}) => {
            const profile = await Profiles.findOne({username})
            const market = await Markets.findOne({shortid: id})
        
            if (profile && market) {

                let shortid = get_id()

                market.purchases = [...market.purchases, {
                    shortid,
                    name: profile.username,
                    change,
                    volume,
                    photo_url,
                    date
                }]

                market.purchases = slicer(market.purchases, 25)

                await Markets.updateOne({shortid: id}, {$set: market})

                return 'Success'
            }
        
            return 'Error'
        },
        updateMarketPhoto: async (_, {username, id, main_photo}) => {
            const profile = await Profiles.findOne({username})
            const market = await Markets.findOne({shortid: id})
        
            if (profile && market) {
                
                market.main_photo = main_photo
                
                await Markets.updateOne({shortid: id}, {$set: market})

                return 'Success'
            }
        
            return 'Error'
        },
        createPerson: async (_, {username, id, fullname, category, country, cords, main_photo}) => {
            const profile = await Profiles.findOne({username, account_id: id})
            const person = await Persons.findOne({creator: username, fullname, category, country, cords})
        
            if (profile && !person) {
                if (profile.account_collections.filter(el => el.path === 'person').find(el => el.title === fullname) === undefined) {

                    let shortid = get_id()

                    profile.account_collections = [...profile.account_collections, {
                        shortid,
                        title: fullname,
                        path: 'person'
                    }]
                
                    const newPerson = new Persons({
                        shortid,
                        account_id: profile.account_id,
                        creator: profile.username,
                        fullname,
                        category,
                        country,
                        cords,
                        main_photo,
                        facts: [],
                        quotes: [],
                        pictures: []
                    })

                    await Profiles.updateOne({username, account_id: id}, {$set: profile})
                    await newPerson.save()

                    return 'Success'
                }
            }

            return 'Error'
        },
        getPersons: async (_, {username}) => {
            const persons = await Persons.find()

            return persons
        },
        getPerson: async (_, {username, shortid}) => {
            const person = await Persons.findOne({shortid})

            return person
        },
        makePersonFact: async (_, {username, id, content, occupation, isTrue}) => {
            const profile = await Profiles.findOne({username})
            const person = await Persons.findOne({shortid: id})
        
            if (profile && person) {

                let shortid = get_id()

                person.facts = [...person.facts, {
                    shortid,
                    name: profile.username,
                    content,
                    occupation,
                    isTrue
                }]

                person.facts = slicer(person.facts, 25)

                await Persons.updateOne({shortid: id}, {$set: person})

                return 'Success'
            }

            return 'Error'
        },
        managePersonQuote: async (_, {username, id, option, text, category, coll_id}) => {
            const profile = await Profiles.findOne({username})
            const person = await Persons.findOne({shortid: id})
        
            if (profile && person) {
                if (option === 'create') {

                    let shortid = get_id()

                    person.quotes = [...person.quotes, {
                        shortid,
                        name: profile.username,
                        text,
                        category,
                        likes: 0
                    }]

                    person.quotes = slicer(person.quotes, 25)

                } else if (option === 'like') {

                    person.quotes.map(el => {
                        if (el.shortid === coll_id) {
                            el.likes += 1
                        }
                    })

                } else {

                    person.quotes = person.quotes.filter(el => el.shortid !== coll_id)
                }

                await Persons.updateOne({shortid: id}, {$set: person})

                return 'Success'
            }

            return 'Error'
        },
        makePersonPicture: async (_, {username, id, label, photo_item, year}) => {
            const profile = await Profiles.findOne({username})
            const person = await Persons.findOne({shortid: id})
        
            if (profile && person) {

                let shortid = get_id()

                person.pictures = [...person.pictures, {
                    shortid,
                    name: profile.username,
                    label,
                    photo_item,
                    year
                }]

                person.pictures = slicer(person.pictures, 25)
                
                await Persons.updateOne({shortid: id}, {$set: person})

                return 'Success'
            }

            return 'Error'
        },
        updatePersonPhoto: async (_, {username, id, main_photo}) => {
            const profile = await Profiles.findOne({username})
            const person = await Persons.findOne({shortid: id})
        
            if (profile && person) {

                person.main_photo = main_photo

                await Persons.updateOne({shortid: id}, {$set: person})

                return 'Success'
            }

            return 'Error'
        }
        
      
        
       



      
    }
}

apollo_start(typeDefs, resolvers, app)

app.post('/poll', async (req, res) => {
    generate_pdf(res, 'poll', req.body)
})

app.listen(PORT, () => console.log(`Server started on ${PORT} port`))