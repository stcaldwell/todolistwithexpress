var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');

var app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

const todolist = [
  {item: "wash car.", status: "checked"},
];

app.get("/", function (req, res) {
  res.render('index', { todoList: todolist });
});

app.post("/", function (req, res) {
  req.checkBody("todo", "Please enter a valid item.").notEmpty();
  var error = req.validationErrors();
  if(error) {
    res.send(error);
  }else {
  todolist.push(req.body.todo);
  res.redirect('/');}
});

app.listen(3000, function () {
  console.log('Successfully started express application!');
});
