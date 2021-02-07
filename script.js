const search = document.getElementById('search');
search.addEventListener('click', function () {
    const foodInput = document.getElementById('foodInput').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ foodInput }`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('foodDisplay').innerHTML = "";
            document.getElementById('foodInfo').innerHTML = ' ';
            const foodDisplay = document.getElementById('foodDisplay');
            data.meals.forEach(foodie => {
                const food = document.createElement('div')
                food.innerHTML = `
            <img src="${ foodie.strMealThumb }" onClick="aboutFood(${ foodie.idMeal })">
            <h1 onClick="aboutFood(${ foodie.idMeal })" >${ foodie.strMeal }</h1>
            `;
                food.className = "card";
                foodDisplay.appendChild(food);
            });
        })
        .catch(() => {
            document.getElementById('foodDisplay').innerHTML = "";
            document.getElementById('foodInfo').innerHTML = ' ';
            const foodDisplay = document.getElementById('foodDisplay');
            const alert = document.createElement('div') 
            alert.innerHTML =`
            <img class="alertImage" src="img/cooking.gif">
            <h1 class="alertLine">Sorry can't find this meals...</h1>
            `
            foodDisplay.appendChild(alert);
        })
        document.getElementById('foodInfo').style.display = 'none';
        document.getElementById('foodInput').value ="";
})

let aboutFood = foodInfo => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodInfo}`)
        .then(res => res.json())
        .then(data => {
            let foodDetails = document.getElementById('foodInfo');
            document.getElementById('foodInfo').innerHTML = ' ';
            document.getElementById('foodInfo').style.display = 'block';
            let foodIngredients = document.createElement('div')
            foodIngredients.className= "foodDiv"
            foodIngredients.innerHTML = `
            <img class="foodImage" src="${ data.meals[0].strMealThumb }">
            <h1>${ data.meals[0].strMeal }</h1>
            <h1>Category: ${ data.meals[0].strCategory }</h1>
            <p><span class=icon>☑</span> ${data.meals[0].strMeasure1}</p>
            <p><span class=icon>☑</span> ${data.meals[0].strMeasure2}</p>
            <p><span class=icon>☑</span> ${data.meals[0].strMeasure3}</p>
            <p><span class=icon>☑</span> ${data.meals[0].strMeasure4}</p>
            <p><span class=icon>☑</span> ${data.meals[0].strMeasure5}</p>
            <p><span class=icon>☑</span> ${data.meals[0].strMeasure6}</p>
            <p><span class=icon>☑</span> ${data.meals[0].strMeasure7}</p>
            <p><span class=icon>☑</span> ${data.meals[0].strMeasure9}</p>
            `;
            foodDetails.appendChild(foodIngredients);
        })
}