const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('without refresh2')
})

app.get('/php', function (req, res) {
    res.send('php use mysql')
  })

app.get('/nodejs', function (req, res) {
res.send('nodejs use mongoDB')
})

app.listen(3000)