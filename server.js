require('dotenv').config();
const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

const public_vapid_key = process.env.PUBLIC_KEY;
const private_vapid_key = process.env.PRIVATE_KEY;

webpush.setVapidDetails('mailto:test@test.com', public_vapid_key, private_vapid_key);

// simple endpoint to 
app.post('/subscribe', (req, res) => {
    // get subscription object from client request body
    const subscription = req.body;

    // spayload to send if resource created successfully
    const payload = JSON.stringify({title: "TESTING"});

    // pass to send notification function
    webpush.sendNotification(subscription, payload)
        .catch(err => {
            throw err
        });
});


app.listen(3000, () => console.log('Hello creature....listening on port: 3000'));