const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());

mongoose
    .connect(
        'mongodb+srv://dbUser:dbUser123@cluster0.lombc.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0'
    )
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    });
