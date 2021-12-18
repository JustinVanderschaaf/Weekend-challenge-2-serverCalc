const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



let answers = [
    {firstNum:24,
    secondNum:12,
    operators:'+'
}
];


// GET /answers endpoint
// localhost:5000/answers
//2a-----coming to app.get /answers to get 
//2a------data and send the obj array
app.get('/answers', (req, res) => {
    console.log('in GET /answers');
    res.send(answers);
});

// --------------2b
app.post('/equation', (req, res) => {
    console.log('in POST /equation', req.body);
    answers.push(req.body);

    // Send back a status code saying ok code 200(ok) 201(created)👍
    res.sendStatus(201);
});



const port = 5000;
app.listen(port, () => {
    console.log('I\'m listening 👂')
});