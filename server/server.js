const express = require('express');
const cors = require('cors');
const budget_data = require('./budget_data.json');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

app.use(cors());

app.get('/hello', (req, res) => {
    res.send('Hello World!, This is Aishwarya');
});

app.get('/budget', (req, res) => {
    res.json(budget_data);
});

app.listen(port, () => {
    console.log(`Budget API is listening at: http://localhost:${port}`);
});