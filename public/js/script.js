function getRecipes() {

    let ingredientName = document.getElementById('ingredient').value
    if(ingredientName === '') {
        return alert('Please enter an ingredient.');
    }

    let ingredientDiv = document.getElementById('ingredientRecipe');
    ingredientDiv.innerHTML = ''

    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          //console.log(xhr.responseText);
            let response = JSON.parse(xhr.responseText)
            let recipes = response.recipes;
            console.log(recipes);
            ingredientDiv.innerHTML = ingredientDiv.innerHTML +
              `<h1>Results for ${ingredientName} </h1>`;
            for(i in recipes){
              /*var title = recipes[i].title;
              ingredientDiv.innerHTML = ingredientDiv.innerHTML +
                `<p> ${title} </p>`*/

              var recipe = recipes[i];
              var title = recipe.title;
              var imageURL = recipe.image_url;
              ingredientDiv.innerHTML = ingredientDiv.innerHTML +
                `<img src=${imageURL} alt=${title} width="200" height="200">`
            }
            //console.log(response);
 			    /*cityDiv.innerHTML = cityDiv.innerHTML + `
			       <h1>Results for ${response.name} </h1>
			       <ul>
			       <li>Location: LON:${response.coord.lon}, LAT:${response.coord.lat}</li>
			       <li>Main: ${response.weather[0].main}</li>
			       <li>Desc: ${response.weather[0].description}</li>
			       </ul>
			       `*/
        }
    }
    xhr.open('GET', `/recipe?ingredient=${ingredientName}`, true)
    xhr.send()
}

//Attach Enter-key Handler
const ENTER=13;
document.getElementById("ingredient").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === ENTER) {
        document.getElementById("submit").click();
    }
});
