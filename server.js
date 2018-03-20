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

app.get('/recipes', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/recipes.html', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/index.html', (request, response) => {
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
    //return response.contentType('application/json').json(JSON.parse(data))
    let responseData = JSON.parse(data)
    let recipes = responseData.recipes;
    //console.log(recipes);
    var responseContent = "";
    responseContent = responseContent +
      `<h1> Results for ${ingredient} </h1>
      <p>
      `;
    for(i in recipes){
      /*var title = recipes[i].title;
      ingredientDiv.innerHTML = ingredientDiv.innerHTML +
        `<p> ${title} </p>`*/

      var recipe = recipes[i];
      var title = recipe.title;
      var imageURL = recipe.image_url;
      var f2fURL = recipe.f2f_url;
      console.log("Recipe = " + title);

      responseContent = responseContent +
      `<a href="${f2fURL}" target="_blank">
      <img border="0" alt="Image cannot be displayed." src="${imageURL}" width="100" height="100">
      </a>`
    }

    responseContent += `</p>`
    return response.send(responseContent);

    //console.log(response);
  /*cityDiv.innerHTML = cityDiv.innerHTML + `
     <h1>Results for ${response.name} </h1>
     <ul>
     <li>Location: LON:${response.coord.lon}, LAT:${response.coord.lat}</li>
     <li>Main: ${response.weather[0].main}</li>
     <li>Desc: ${response.weather[0].description}</li>
     </ul>
     `*/
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
