var express = require('express')
var cors = require('cors')
var app = express()
 
app.use(cors())

var data;

const jsonfile = require('jsonfile')
const file = 'json-data.json'
jsonfile.readFile(file, function (err, obj) {
  if (err) console.error(err)
  console.dir(obj)
  data = obj;
})


var articles = [
    {
      "id": 1,
      "name": "Breaking Bad",
      "description": "Breaking Bad is an American neo-Western crime drama television series created and produced by Vince Gilligan. The show aired on AMC from January 20, 2008.",
      "year": "2008-2013",
      "linkToImdb": "https://www.imdb.com/title/tt0903747/",
      "image": "https://images4.alphacoders.com/258/thumb-1920-258026.png"
    },
    {
      "id": 2,
	  "name": "Game Of Throne",
      "description": "Game of Thrones is an American fantasy drama television series created by David Benioff and D. B. Weiss for HBO. It is an adaptation of A Song of Ice and Fire, a series of fantasy novels by George R. R. Martin.",
      "year": "2011-2019",
      "linkToImdb": "https://www.imdb.com/title/tt0944947/",
      "image": "https://wallpapercave.com/wp/wp2062228.jpg"
    },
    {
	  "id": 3,
      "name": "Mr. Robot",
      "description": "Mr. Robot is an American drama thriller television series created by Sam Esmail for USA Network. A cybersecurity engineer and hacker with social anxiety disorder and clinical depression.",
      "year": "2015-2020",
      "linkToImdb": "https://www.imdb.com/title/tt4158110/",
      "image": "https://wallpapercave.com/wp/wp1810633.jpg"
    },
     {
	  "id": 4,
      "name": "Sherlock ",
      "description": "Sherlock is a British crime television series based on Sir Arthur Conan Doyle's Sherlock Holmes detective stories. Created by Steven Moffat and Mark Gatiss.",
      "year": "2010-2017",
      "linkToImdb": "https://www.imdb.com/title/tt1475582/",
      "image": "https://wallpapercave.com/wp/wp2032047.jpg"
    },
     {
	  "id": 5,
      "name": "The Leftovers",
      "description": "Three years after the disappearance of two percent of the global population, a group of people in a small New York community try to continue their lives while coping with the tragedy of the unexplained nature of the event.",
      "year": "2014-2017",
      "linkToImdb": "https://www.imdb.com/title/tt2699128/",
      "image": "https://wallpapercave.com/wp/wp2399106.jpg"
    },
     {
	  "id": 6,
      "name": "Peaky Blinders",
      "description": "A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby.",
      "year": "2013-2019",
      "linkToImdb": "https://www.imdb.com/title/tt2442560/",
      "image": "https://wallpapercave.com/wp/wp1890608.jpg"
    }
];

var users = [
    {
      "name": "asd",
      "email": "adf",
      "password": "asd",
      "id": 3
    },
    {
      "name": "alfn",
      "email": "klxfn",
      "password": "v,l",
      "id": 4
    },
    {
      "name": "asd",
      "email": "kas",
      "password": "sldfjk",
      "id": 5
    }
];

var team = [
  {
    "name": "Walter White(Heisenberg)",
    "subtitle": "The Chef",
    "image": "https://i.postimg.cc/MphwJh7Y/walter.jpg",
    "id": 1
  },
  {
   "name": "Jesse Pinkman",
    "subtitle": "The Assistant",
    "image": "https://i.postimg.cc/5yn1cygH/jesse.jpg",
    "id": 2
  },
  {
    "name": "Hank Schrader",
    "subtitle": "The Detective",
    "image": "https://i.postimg.cc/9f7W4WmS/hank.jpg",
    "id": 3
  },
  {
    "name": "Gus Fring",
    "subtitle": "The Chilean",
    "image": "https://i.postimg.cc/qvrcD7Yc/BCS-S3-Gus-Fringe.jpg",
    "id": 4
  }
];

var directors = [
  {
      "name": "Steven Spielberg",
      "works": "Catch Me If You Can - Schindler's List - The Post - Jaws - The Terminal",
      "linkToWiki": "https://en.wikipedia.org/wiki/Steven_Spielberg",
      "image": "https://i.postimg.cc/HsfLzKgc/steven.jpg",
      "id": 1
    },
    {
      "name": "Martin Scorsese",
      "works": "Goodfellas - The Irishman - Taxi Driver - The Departed - Shutter Island",
      "linkToWiki": "https://en.wikipedia.org/wiki/Martin_Scorsese",
      "image": "https://i.postimg.cc/qv3xD969/martin.jpg",
      "id": 2
    },
    {
      "name": "Alfred Hitchcock",
      "works": "The Birds - Rear Window - psycho - Rebecca - Dial M For Murder",
      "linkToWiki": "https://en.wikipedia.org/wiki/Alfred_Hitchcock",
      "image": "https://i.postimg.cc/Wzxs9DQL/alfred.jpg",
      "id": 3
    },
    {
      "name": "Quentin Tarantino",
      "works": "Pulp Fiction - Inglourious Basterds - Once Upon A Time In Hollywood - Grindhouse",
      "linkToWiki": "https://en.wikipedia.org/wiki/Quentin_Tarantino",
      "image": "https://i.postimg.cc/HjGCwqyT/quentin.jpg",
      "id": 4
    },
    {
      "name": "Paul Thomas Anderson",
      "works": "The Master - Anima - There Will Be Blood - Mangnolia - Hard Eight",
      "linkToWiki": "https://en.wikipedia.org/wiki/Paul_Thomas_Anderson",
      "image": "https://i.postimg.cc/tJJh3fHv/paul.jpg",
      "id": 5
    },
    {
      "name": "Christopher Nolan",
      "works": "The Dark Knight - Inception - Interstellar - Tenet - Memento",
      "linkToWiki": "https://en.wikipedia.org/wiki/Christopher_Nolan",
      "image": "https://i.postimg.cc/Jh7tHX8P/christopher.jpg",
      "id": 6
    }
];

app.get('/', function (req, res) {

    res.json(data)
    
})

app.get('/articles', function (req, res) {

  res.json(articles)
  
})

app.get('/users', function (req, res) {

  res.json(users)
  
})

// app.get('/users', (req, res) => {
//   return res.send(Object.values(users));
// });


//filtering json data based on id 
app.get('/users/:userId', (req, res) => {
  var newArray = users.filter(function (el) {
    return el.id == req.params.userId;
  });
  return res.send(newArray);
});

app.get('/team', function (req, res) {

  res.json(team)
  
})

app.get('/directors', function (req, res) {

  res.json(directors)
  
})


// start the server listening for requests
app.listen(process.env.PORT || 3000, 
    () => console.log("Server is running..."));