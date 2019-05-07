const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
let watchlist = [];

app.use(express.json({ extended: false }));
app.put('/watchlist', (req, res) => {
    if (watchlist.indexOf(req.body.id) == -1) {
        watchlist.push(req.body.id);
    }
    res.status(200).send();
    console.log('put', watchlist);
})
app.delete('/watchlist', (req, res) => {
    for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i] === req.body.id) {
            watchlist.splice(i, 1);
        }
    }
    console.log('delete', watchlist);
    res.status(200).send();
})

app.get('/watchlist', (req, res) => res.send(watchlist));
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));