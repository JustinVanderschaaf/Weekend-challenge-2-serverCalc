$(document).ready(onReady);

function onReady() {
  console.log(`So damn ready 🐷`);
  $("button").on("click", function (evt) {
    evt.preventDefault();
    operator = $(this).text();
    console.log(operator); // print the value of i in the console
  });
  $("#calculatorForm").on("submit", addCalculation);
  refresh();
}
let operator;

function addCalculation(event) {
  // Don't reload the page!
  event.preventDefault();
  //---making a request doc and sending it to the server----
  // Prepare our  object
  // to POST to the server
  // making the inputs into a object to get ready to post to the DOM
  let equation = {
    firstNum: $("#firstInput").val(),
    secondNum: $("#secondInput").val(),
    operators: operator,
    total: 0,
  };
  console.log("equation", equation);

  // Send data to server-----1b
  $.ajax({
    method: "POST",
    url: "/equation",
    // Send the equation to the server
    // in the request "body"
    // data: equation will become data: req.body
    // on the server
    data: equation,
  }).then((response) => {
    console.log("POST response", response);

    // Refresh...
    // GET /answers from the server again
    // and render to the DOM
    refresh();
  });
}

function refresh() {
  // Make a network request
  // Make a HTTP request
  // Make an AJAX request
  // AJAX === "Asynchronous Javscript and XML"
  //1a-----goes to app.get answers looks for the send
  //1a----and returns
  let ajaxOptions = {
    method: "GET",
    url: "/answers",
  };
  $.ajax(ajaxOptions).then((response) => {
    console.log("AJAX request complete!", response);
    render(response);
    //3a-----response became the obj array and called
    //3a-----render with response as an argument
  });

  console.log(`
        Made a network request, but 
        no one has time to wait 
        for that....
    `);
}

function render(answers) {
  // (state) to the DOM
  $("#displayCalc").empty();
  for (let result of answers) {
    $("#displayCalc").append(`
            <li>
                ${result.firstNum} ${result.operators}
                ${result.secondNum} = ${result.total}
                <div>
                
                </div>
            </li>
        `);
    $("#displayResult").text(result.total);
  }
}

function totalRender(total) {
  $("#displayResult").text(`${total}`);
}

function total() {
  let ajax = {
    method: "GET",
    url: "/result",
  };
  $.ajax(ajax).then((response) => {
    console.log("AJAX request complete!", response);
    totalRender(response);
    //3a-----response became the obj array and called
    //3a-----render with response as an argument
  });

  console.log(`
        Made a network request, but 
        no one has time to wait 
        for that....
    `);
}
