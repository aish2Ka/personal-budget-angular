const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

app.use(cors());

app.get('/hello', (req, res) => {
    res.send('Hello World!, This is Aishwarya');
});

const budget = {
    Aishwarya_Budget: [
        {
            title: 'Eat out',
            budget: 25
        },
        {
            title: 'Rent',
            budget: 275
        },
        {
            title: 'Grocery',
            budget: 110
        },
    ]
};


app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(port, () => {
    console.log(`Budget API is listening at: http://localhost:${port}`);
});