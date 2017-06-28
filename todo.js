const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const models = require('./models');
const expressValidator = require('express-validator');

var app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

// const todolist = [
//   {item: "wash car.", status: "checked"},
// ];


app.get("/", function (req, res) {
  models.todotable.findAll().then(function(TodoApp) {
    res.render('index', {todoList: TodoApp})
  })
});

app.post("/", function (req, res) {
  var todolist = models.todotable.build({
    item: req.body.todo,
    status: req.body.completed
  });
  todolist.save().then(function(newtodo){
    res.redirect('/')
  });

});

app.listen(3000, function () {
  console.log('Successfully started express application!');
});
