const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("server/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let answers = [];
let finalTotal = 0;

// --------------2b
app.post("/equation", (req, res) => {
  console.log("in POST /equation", req.body);
  console.log("THIS IS FIRST NUM", req.body.firstNum);
  let finalObj = {
    firstNum: 0,
    secondNum: 0,
    operators: "+",
    total: 0,
  };

  function math() {
    console.log("in math", Number(req.body.firstNum));
    if (req.body.operators === "+") {
      finalTotal = Number(req.body.firstNum) + Number(req.body.secondNum);
    } else if (req.body.operators === "-") {
      finalTotal = Number(req.body.firstNum) - Number(req.body.secondNum);
    } else if (req.body.operators === "/") {
      finalTotal = Number(req.body.firstNum) / Number(req.body.secondNum);
    } else if (req.body.operators === "*") {
      finalTotal = Number(req.body.firstNum) * Number(req.body.secondNum);
    }
  }
  math();

  finalObj.firstNum = req.body.firstNum;
  finalObj.secondNum = req.body.secondNum;
  finalObj.operators = req.body.operators;
  finalObj.total = finalTotal;

  answers.push(finalObj);

  // Send back a status code saying ok code 200(ok) 201(created)👍
  res.sendStatus(201);
});

// GET /answers endpoint
// localhost:5000/answers
//2a-----coming to app.get /answers to get
//2a------data and send the obj array
app.get("/answers", (req, res) => {
  console.log("in GET /answers");
  res.send(answers);
});
//-----
app.get("/result", (req, res) => {
  console.log("in GET /result");
  res.send(result);
});

const port = 5000;
app.listen(port, () => {
  console.log("I'm listening 👂");
});
