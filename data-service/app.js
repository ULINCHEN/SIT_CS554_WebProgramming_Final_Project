import express from 'express';
import configRoutes from "./routes/index.js"
import cors from 'cors';
const app = express();
import session from 'express-session';
import redis from 'redis';
import path from 'path';
import {fileURLToPath} from "url";
import {dirname} from "path";
// import RedisStore from "connect-redis"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/public', express.static('./public'));
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from a different directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/***************************** store session in redis ******************/
const redisClient = redis.createClient({legacyMode: true});

/* This config redisClient is for docker only
const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        port: 6379,
        host: 'redis'
     }
}); */

redisClient.connect().then(()=> {console.log('Redis is working...')});
redisClient.on('error', function (err) {
    console.log('Error from redis connection: ' + err);
})
redisClient.on('connect', function() {
    console.log('Redis is connected successfully!');
})

// Initialize store.
// const redisStore = new RedisStore({
//     host: 'localhost',
//     port: 6379,
//     client: redisClient,
// })

// Server log
app.use(async (req, res, next) => {
    const timeStamp = new Date().toUTCString();
    const method = req.method;
    const reqRoute = req.originalUrl;
    const body = req.body
    // const userAuthState = req.session.user ? true : false;

    console.log(
        "[",
        timeStamp,
        "]",
        ":",
        method,
        reqRoute,
        ":",
        "Request Body: ",
        body,
        // "userAuthState: ",
        // userAuthState
    );

    next();
});

app.use(
    session({
        name: "AuthCookie",
        secret: "StevensCS554",
        resave: false,
        saveUninitialized: true,
        cookie: {
            expires: new Date(Date.now() + 5*60*60*1000),
        }
    })
);

// app.use(
//     session({
//         name: "AuthCookie",
//         secret: "StevensCS554",
//         store: new RedisStore({
//             host: 'localhost',
//             port: 6379,
//             client: redisClient,
//             prefix: "petMatch: "
//         }),
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             expires: new Date(Date.now() + 5*60*60*1000),
//         }
//     })
// );


// track each router request time
const counter = new Map()
app.use(async (req, res, next) => {
    const reqRoute = req.originalUrl;
    if (counter.has(reqRoute)) {
        counter.set(reqRoute, counter.get(reqRoute) + 1)
    }
    else {
        counter.set(reqRoute, 1)
    }
    console.log(reqRoute, " => request times => ", counter.get(reqRoute));
    next();
})

app.use('/pets', (req, res, next)=> {
    if (!req.session.pet) {
        return res.status(403).json({Error: 'Please login first'});
    }else {
        next();
    }
})

app.use('/chat', (req, res, next) =>{
    if (!req.session.pet) {
        return res.status(403).json({Error: 'Please login first'});
    }else {
        next();
    }
})

app.use('/profile/:id', (req, res, next)=> {
    if (!req.session.pet) {
        return res.status(403).json({Error: 'Please login first'});
    }else {
        next();
    }
})

app.get('/pets/:id', async (req, res, next) => {
    let key = req.params.id.trim();
    let exist = await redisClient.v4.exists(key);

    if (exist) {
        console.log("show pet profile from cache...")
        try {
            let recipe = await redisClient.v4.get(key);
            recipe = JSON.parse(recipe);
            res.status(200).json(recipe);
        }catch (e) {
            return res.status(500).json({Error: 'Redis Error!'});
        }
    }else {
        next();
    }
})

app.get('/public/:filename', function(req, res) {
    // console.log('hit this route');
    const { filename } = req.params;
    const imagePath = path.join(__dirname, 'public/uploads', filename);
    res.sendFile(imagePath);
});



configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});