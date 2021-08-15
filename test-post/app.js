const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req, res) => {
 // res.sendfile("index.html");
  res.send("hello from get");
});

app.get('/search', async function(req, res) {

  // Access the provided 'page' and 'limt' query parameters
  let page = req.query.page;
  let limit = req.query.limit;
  console.log(page)

  // Return the articles to the rendering engine
  res.json({
      page: page,
      limit: limit
  });
});

app.post('/login',(req, res) => {   
  var user_name = req.body.user;
  var password = req.body.password;
  var json_data = {
    username: user_name,
    pass : password
  }
  console.log("User name = "+user_name+", password is "+password);
  //res.send(`hello from post, this is your info:\n ${user_name} <-> ${password}`);
  res.send(json_data);
});

/* app.get('/login',(req, res) => {   
    var user_name = req.body.user;
    var password = req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    res.end("no\n" + user_name + password);
  });
 */
app.listen(3000,() => {
  console.log("Started on PORT 3000");
})