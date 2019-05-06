const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const axios = require('axios');
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
app.post('/watchlist', (req, res) => {
    //console.log('res: ', res.body.data);
    const movie = Object.assign({}, req.body);
    watchlist.push(movie);
    console.log('req: ', req.body);
    res.status(200).send();
    //console.log(watchlist);
})

//app.get('/', (req, res) => res.send("Api Running"));
//app.use('/', events);


//app.use((req, res) => { res.status(404).render('Page not found') });
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));