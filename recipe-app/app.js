
const meals = document.getElementById("meals");
const favMealcontainer = document.getElementById("fav-meals");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");
const mealDetail = document.querySelector("#meal-detail");
const mealCloseBtn = document.getElementById("close-popup");
const mealinfoContainer = document.querySelector(".meal-info-container");


getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {

    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await response.json();
    const randomMeal = respData.meals[0];
    console.log(randomMeal);

    addMeal(randomMeal, true);
}

async function getMealByID(id){
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' +id);
    const respData = await response.json();
    const meal = respData.meals[0];
    return meal;
}


async function GetMealBySearh(term){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const respData = await response.json();
    const meal = respData.meals;
    return meal;
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
                <div class="meal-header">
                    ${random ? `<span class="random">
                    Random Recipe
                </span>` : ''}
                    
                    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                </div>
                <div class="meal-body">
                    <h4>${mealData.strMeal}</h4>
                    <button class="fav-btn">
                        <i class="fas fa-heart"></i>    
                    </button>
                </div>
        `;

        const btn = meal.querySelector(".meal-body .fav-btn");

        btn.addEventListener("click", () => {
            if(btn.classList.contains("active")) {
                removeMealFromLS(mealData.idMeal);
                btn.classList.remove("active");
            } else {
                addMealToLS(mealData.idMeal);
                btn.classList.add("active");

            }

            fetchFavMeals();
        });

        meal.addEventListener("click", () => {
            showMealInfo(mealData);
        })

        meals.appendChild(meal);
}

// Local storage
function addMealToLS(mealId) {
    const mealIds = getMealsFromLS();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealFromLS(mealId) {
    const mealIds = getMealsFromLS();
    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter((id) => id !== mealId))
    );
}

function getMealsFromLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
    //clean the container 
    favMealcontainer.innerHTML="";

    const mealIds = getMealsFromLS(); 


    for(let i = 0; i<mealIds.length; i++) {
        const mealId = mealIds[i];
        meal =  await getMealByID(mealId);
        addMealFav(meal);
    }
}


function addMealFav(mealData) {
    const favMeal = document.createElement('li');
    favMeal.innerHTML = `
                    <li class="fav-meal-list">
                        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                        <span>${mealData.strMeal}</span>
                    </li>
                    <button class="clear-btn"> <i class= " clear fa-solid fa-square-xmark"></i></button>
        `;

        const btn = favMeal.querySelector('.clear');
        btn.addEventListener('click', () => {
            removeMealFromLS(mealData.idMeal);
            fetchFavMeals();
        })

    favMeal.addEventListener("click", () => {
        showMealInfo(mealData);
    })
    favMealcontainer.appendChild(favMeal);
}

searchBtn.addEventListener("click", async() => {
    // clean container
    meals.innerHTML="";

    const search = searchTerm.value;
    
    // console.log(search);
    const mealsSearch = await GetMealBySearh(search);
    // console.log(await GetMealBySearh(search));

    if(mealsSearch){
        mealsSearch.forEach((meal) => {
            addMeal(meal);
        });

    }
});



function showMealInfo(mealData) {
    mealDetail.innerHTML = "";

    const mealElm = document.createElement('div');

    const ingredients = [];

    for(let i=1; i<=20; i++) {
        if(mealData['strIngredient'+ i]) {
            ingredients.push(`${mealData['strIngredient'+ i]}/${mealData['strMeasure'+ i]}`);
        }else{
            break;
        }
    }

    mealElm.innerHTML = `
            <h2>${mealData.strMeal}</h2>
            <img src=${mealData.strMealThumb} alt="${mealData.strMeal}">
            <p>${mealData.strInstructions}</p>
            <h3>Ingredients</h3>
            <ul>
            ${ingredients.map((ing) =>  `<li>${ing}</li>`).join("")}
            </ul> `; 
            
    mealDetail.appendChild(mealElm);
    // show popup
    mealinfoContainer.classList.remove('hidden');
    
}


mealCloseBtn.addEventListener('click', () => {
    mealinfoContainer.classList.add('hidden');

})
