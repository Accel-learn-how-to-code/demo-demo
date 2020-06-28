// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'pug');
app.set('views','');

var usersList = [
    {id: 1, name: 'Accel'},
    {id: 2, name: 'Long'},
    {id: 3, name: 'Vy'},
    {id: 4, name: 'Huyền'},
    {id: 5, name: 'Khoa'}
];

app.get('/', function (req, res) {
    res.render('index', {
        name: 'Accel'
    });
});
app.get('/users', function (req, res) {
    res.render('index2', {
        users: usersList
    });
});

app.get('/users/search', function (req, res) {
    var q = req.query.q;
    var matchUsers = usersList.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('index2', {
        users: matchUsers
    });
});
app.get('/users/create', function (req, res) {
    res.render('create')
});

app.post('/users/create', function (req, res) {
    usersList.push(req.body);
    res.redirect('/users');
});
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
