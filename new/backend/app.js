const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Pen = require('./models/pen');

// Allow requests from http://localhost:5173
app.use(cors({ origin: 'http://localhost:5173' }));

const dbURI = 'mongodb+srv://lukas:lukas@cluster0.uzxq2yb.mongodb.net/?retryWrites=true&w=majority'
//const dbURI = 'mongodb+srv://lukas:lukas@cluster0.h8rbi.mongodb.net/database?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true})
    .then(() => console.log('database connected'))
    .catch(err => console.log(err));

app.get('/pens', (req, res) => {
    Pen.find().then((result) => {
        res.json({ pens: result });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Error when fetching pens' });
    });
});

app.get('/pen/:id', (req, res) => {
    let penId = req.params.id;

    Pen.findById(penId, (err, pen) => {
        if ( err ) {
            console.log(err);
            res.status(500).json({ error: 'Error when fetching pen ' + penId})
        }

        res.json({pen: pen});
    });
});


//start
let port = process.env.PORT || 1111;
app.listen(port, console.log("running..."));
