const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/',(req, res) => {
    res.sendStatus(200);
});
app.post('/save-client', (req, res) => {
    console.log('Got body:', req.body);
    //res.sendStatus(200);
    res.send(req.body);
});

app.listen(3000, () => console.log(`Started server at http://localhost:3000!`));