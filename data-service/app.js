import express from 'express';
import configRoutes from "./routes/index.js"

const app = express();
const session = require('express-session');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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
    })
);


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
    if (!req.session.user) {
        return res.status(403).json({Error: 'Please login first'});
    }else {
        next();
    }
})

app.use('/chat', (req, res, next) =>{
    if (!req.session.user) {
        return res.status(403).json({Error: 'Please login first'});
    }else {
        next();
    }
})



configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});