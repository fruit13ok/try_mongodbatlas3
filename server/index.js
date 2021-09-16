// REQUIREMENTS

// native
const path = require('path');

// 3rd party
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const bodyParser = require('body-parser');
// const http = require('http');
// import http from 'http';
// const fetch = require("node-fetch");
// import fetch from 'node-fetch';

// require mongoose and our models, treat result model like a class write in upper case
const mongoose = require('mongoose');
const User = require('../models/user');
const Resultbacklink = require('../models/resultbacklink');
const Resultrelatedsearch = require('../models/resultrelatedsearch');

// local
const app = express();
const port = process.env.PORT || 8000;

// connect to mongodb
const dbURI = "mongodb+srv://user0:user0@cluster0.j2v4j.mongodb.net/database0?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err));

// MIDDLEWARE
app.use(express.static(path.join(__dirname, '../public')));
app.use('/css', express.static(__dirname + '../node_modules/bootstrap/dist/css'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allow cors to access this backend
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// INIT SERVER
// may be I should init server after I connected to database.
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

// helper functions
// generate 1 sample backlink data object like part 5 of the scraper
let getRandomResultbacklink = () => {
    let result = {};
    switch (Math.floor(Math.random() * 3)){
        case 0:
            result["url"] = "https://www.example0.com/";
            break;
        case 1:
            result["url"] = "https://www.example1.com/";
            break;
        case 2:
            result["url"] = "https://www.example2.com/";
    }
    switch (Math.floor(Math.random() * 2)){
        case 0:
            result["status"] = "200";
            break;
        case 1:
            result["status"] = "404";
    }
    return result;
};

// generate random number within given range
let renInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// generate 1 sample related search data object like part 1 of the scraper
let getRandomResultrelatedsearch = () => {
    const characters ='abcdefghijklmnopqrstuvwxyz0123456789';
    let searchKey = '';
    for (let i = 0; i < renInt(10, 20); i++) {
        searchKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    let count = renInt(1, 4);
    let totalCount = renInt(20, 80);
    let percentage = (count / totalCount * 100).toFixed(2).toString();
    return {searchKey: searchKey, count: count, totalCount: totalCount, percentage: percentage};
};

// ROUTES
// root
app.get('/', function (req, res) {
    res.send('hello world');
});

// post, get form data from frontend
// save new user to DB
// first time run it will auto create a new collection name 'users' plural form of our model name 'User'
// to save new data I user 2 steps way, create a new model object and than save
app.post('/save-user', async (req, res) => {
    req.setTimeout(0);
    const newUserName = req.body.newUserName || 'user0';
    const newUserPassword = req.body.newUserPassword || 'password0';
    try {
        const user = new User({
            username: newUserName,
            userpassword: newUserPassword
        });
        let savedUser = await user.save();  // later don't save sent back object "savedUser"
        res.status(200).send(savedUser);
        // res.status(200).send({msg:'savedUser'});
    } catch (err) {
        res.send(err);
    }
});

// save new randomly generated backlink data to DB for the given / existing user
app.post('/save-resultbacklink', async (req, res) => {
    req.setTimeout(0);
    const userName = req.body.userName || 'example';
    const resultArray = [];
    for (let i = 0; i < 50; i++){
        resultArray.push(getRandomResultbacklink());
    }
    try {
        let foundUser = await User.find({username: userName})
        .select('-__v -userpassword');
        try {
            const resultbacklink = new Resultbacklink({
                user: foundUser[0]._id,
                backlinks: resultArray
            });
            let savedResult = await resultbacklink.save();
            res.status(200).send(savedResult);
        } catch (err) {
            res.send('result error: ', err);
        }
    } catch (err) {
        res.send('user error: ',err);
    }
});

// save new randomly generated related search data to DB for the given / existing user
app.post('/save-resultrelatedsearch', async (req, res) => {
    req.setTimeout(0);
    const userName = req.body.userName || 'example';
    const resultArray = [];
    for (let i = 0; i < 50; i++){
        resultArray.push(getRandomResultrelatedsearch());
    }
    try {
        let foundUser = await User.find({username: userName})
        .select('-__v -userpassword');
        try {
            const resultrelatedsearch = new Resultrelatedsearch({
                user: foundUser[0]._id,
                relatedsearchs: resultArray
            });
            let savedResult = await resultrelatedsearch.save();
            res.status(200).send(savedResult);
        } catch (err) {
            res.send('result error: ', err);
        }
    } catch (err) {
        res.send('user error: ',err);
    }
});

// find all backlink result
// use 'populate' on user because result models reference user model
// populate('the_referenced_fieldname')
app.get('/all-resultbacklink', async (req, res) => {
    req.setTimeout(0);
    // use the model itself Resultbacklink not its instance
    // find() or find({}) will query all data from results model from online db
    try {
        let allResultbacklink = await Resultbacklink.find()
        .select('-_id -__v -backlinks._id')  // fields to exclude from resultbacklink
        .populate('user', '-_id -__v -userpassword')   // 'user' is ResultbacklinkSchema's field name, fields to exclude from user, NOTE id can't be exclude but will set to null
        .exec();
        res.status(200).send(allResultbacklink);
    } catch (err) {
        res.send(err);
    }
});

// find all related search result
app.get('/all-resultrelatedsearch', async (req, res) => {
    req.setTimeout(0);
    try {
        let allResultrelatedsearch = await Resultrelatedsearch.find()
        .select('-_id -__v -relatedsearchs._id')  // fields to exclude from resultrelatedsearch
        .populate('user', '-_id -__v -userpassword')
        .exec();
        res.status(200).send(allResultrelatedsearch);
    } catch (err) {
        res.send(err);
    }
});

// find given user's results
// use 'virtual populate' on each results because only result models reference user model 
// populate('virtual_referenced_collectionname')
app.post('/find-userresult', async (req, res) => {
    req.setTimeout(0);
    const userName = req.body.userName || '';
    try {
        let foundUser = await User.find({username: userName})
        .select('-__v -userpassword')  // fields to exclude from user, need to include user '_id' for virtual populate
        .populate('virtualResultbacklink', '-__v -_id -backlinks._id')
        .populate('virtualResultrelatedsearch', '-__v -_id -relatedsearchs._id')
        .exec();
        res.status(200).send(foundUser);
    } catch (err) {
        res.send(err);
    }
});
