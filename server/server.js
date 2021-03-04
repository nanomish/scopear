require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT, MONGODB_CONNECTION_STRING } = process.env;
const Blockchain = require('./models/block');

app.use(cors());
app.use(bodyParser.json());
app.use('/blocks', require('./routes/blocks'));

console.log("DB string %s", MONGODB_CONNECTION_STRING);
app.listen(PORT, async () => {
    console.log("Success listening on port %s", PORT);
    try {
        await mongoose.connect(MONGODB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("connected to mongodb successfully");
        await Blockchain.initializeBlockchain();
    }
    catch (e) {
        console.log("mongodb error: " + e);
    }
});
