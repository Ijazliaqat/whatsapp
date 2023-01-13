
const express = require("express");
const app = express();

var bodyParser = require('body-parser');
const Messages = require("./dbMessages.js");
const Pusher = require("pusher");
const cors = require('cors');

const connectDB = require("./db/connect");
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1534894",
    key: "a4a7172bef7de76823ae",
    secret: "e25dacfaa98e9600ca58",
    cluster: "ap2",
    useTLS: true
});

app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");

//     next();
// })


//app config

const db = mongoose.connection;

db.once("open", () => {
    console.log('Pusher');

    const msgCollection = db.collection("messages");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log(change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    receive: messageDetails.receive,
                }
            );
        } else {
            console.log('Error Triggring Pusher');
        }
    });
});


app.get("/", (req, res, next) => res.status(200).send('Welcome to MERN Crazy World.....'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', async (req, res, next) => {
    console.log(req.body);
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => { console.log(`Server is running: ${PORT}`) });

    } catch (error) {
        console.log(error);
    }
}

start();