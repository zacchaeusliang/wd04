/*
NOTE: THIS CODE WILL NOT RUN UNTIL YOU ENTER YOUR OWN openweathermap.org APP ID KEY

NOTE: You need to intall the npm modules by executing >npm install
before running this server

Simple express server re-serving data from openweathermap.org
To test:
http://localhost:3000
or
http://localhost:3000/weather?city=Ottawa
to just set JSON response. (Note it is helpful to add a JSON formatter extension, like JSON Formatter, to your Chrome browser for viewing just JSON data.)
*/
const express = require('express') //express framework
const requestModule = require('request') //npm module for easy http requests
const PORT = process.env.PORT || 3000

/*YOU NEED AN APP ID KEY TO RUN THIS CODE
  GET ONE BY SIGNING UP AT openweathermap.org
  THE KEY BELOW IS FAKE
*/
//const WEATHER_API_KEY = '6c2c936aab805d349ddee4cd2fed0ffc' //PUT IN YOUR OWN KEY HERE
const API_KEY = '63aa420eb4e6bcd8d163e6dcdb52caa9'

const app = express()

//Middleware
app.use(express.static(__dirname + '/public')) //static server

//Routes
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/recipe', (request, response) => {
  let ingredient = request.query.ingredient
  if(!ingredient) {
    return response.json({message: 'Please enter an ingredient'})
  }
  const url = `http://www.food2fork.com/api/search?q=${ingredient}&key=${API_KEY}`
  requestModule.get(url, (err, res, data) => {
    if(err){console.log(err);}
    return response.contentType('application/json').json(JSON.parse(data))
  })
})

//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`To Test:  http://localhost:3000/weather?city=Ottawa`)
    console.log(`To Test: http://localhost:3000`)

  }
})
