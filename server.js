const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
//const axios = require('axios');
//const events = require('./routes/api/events');
let watchlist = [];
// axios.get('http://api.tvmaze.com/shows')
//     .then(result => {
//         watchlist = result.data;
//     })
//     // .then(() => {
//     //     console.log(watchlist);

//     // })
//     .catch(err => console.log(err));


app.use(express.json({ extended: false }));
app.put('/watchlist', (req, res) => {
    if (watchlist.indexOf(req.body.id) == -1) {
        watchlist.push(req.body.id);
    }
    res.status(200).send();
    console.log(watchlist);
})
app.delete('/watchlist', (req, res) => {
    console.log(watchlist);

    for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i] == req.body.id) {
            watchlist.splice(i, 1);
        }
    }
    console.log(watchlist);
    res.status(200).send();
})

app.get('/watchlist', (req, res) => res.send(watchlist));


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));