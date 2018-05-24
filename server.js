const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

/**
 * @todo add to .env
 */
const public_vapid_key = 'BOu7vP_sncGSLzigVgTH1XeQ6KBQb5kK24jLoB00E0VliEOWSJZDi5MvAiQxt9V68g5RjTlB3GhPOJpkP-G11es';
const private_vapid_key = 'gS5SUKX9rIf3B8jf2vjidMzBBhKSRqxzRAXNn_3mGJs';

webpush.setVapidDetails('mailto:test@test.com', public_vapid_key, private_vapid_key);


app.post('/subscribe', (req, res) => {
    // get subscription object
    const subscription = req.body;

    // send success if resource created successfully
    const payload = JSON.stringify({title: "TESTING"});

    // pass to send notification function
    webpush.sendNotification(subscription, payload)
        .catch(err => {
            throw err
        });
});

const port = 3000;
app.listen(3000, () => console.log(`Hello creature....listening on port: ${port}`));