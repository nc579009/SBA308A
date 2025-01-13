// script.js

//import axios from "axios";
// DOM Elements
const mealSearch = document.getElementById('mealSearch');
const searchButton = document.getElementById('searchButton');
const mealResults = document.getElementById('mealResults');
const favoriteMeals = document.getElementById('favoriteMeals');
const plannerContainer = document.getElementById('plannerContainer');

// API Endpoint
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Utility Function to Fetch Data from API
async function fetchData(url) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${url}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to Display Meal Results
async function displayMealResults(query) {
  const data = await fetchData(`search.php?s=${query}`);
  mealResults.innerHTML = ''; // Clear previous results
  if (data && data.meals) {
    data.meals.forEach(meal => {
      const mealCard = createMealCard(meal);
      mealResults.appendChild(mealCard);
    });
  } else {
    mealResults.innerHTML = '<p>No meals found.</p>';
  }
}

// Function to Create Meal Card
function createMealCard(meal) {
  const card = document.createElement('div');
  card.className = 'mealCard';

  const mealName = document.createElement('h3');
  mealName.textContent = meal.strMeal;

  const mealImage = document.createElement('img');
  mealImage.src = meal.strMealThumb;
  mealImage.alt = meal.strMeal;

  const addButton = document.createElement('button');
  addButton.textContent = 'Add to Favorites';
  addButton.className = 'addButton';
  addButton.addEventListener('click', () => addToFavorites(meal));

  card.appendChild(mealName);
  card.appendChild(mealImage);
  card.appendChild(addButton);

  return card;
}

// Function to Add Meal to Favorites
function saveToFavorites(recipe) {
    // Get the current favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Check if the recipe is already in favorites
    const exists = favorites.find((fav) => fav.idMeal === recipe.idMeal);

    if (!exists) {
        // Add the recipe to the favorites array
        favorites.push(recipe);

        // Save the updated array back to localStorage
        localStorage.setItem("favorites", JSON.stringify(favorites));

        alert(`${recipe.strMeal} has been added to your favorites!`);
    } else {
        alert(`${recipe.strMeal} is already in your favorites!`);
    }
}


// function addToFavorites(meal) {
//   const favoriteCard = createMealCard(meal);
//   favoriteMeals.appendChild(favoriteCard);
// }

// Event Listeners
searchButton.addEventListener('click', () => {
  const query = mealSearch.value.trim();
  if (query) {
    displayMealResults(query);
  }
});

