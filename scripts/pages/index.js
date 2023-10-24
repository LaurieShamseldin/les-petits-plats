import recipes from '../../data/recipes.js';
import recipeFactory from '../factories/recipe.js';
import { displaySearchRecipes } from '../utils/search.js';


let recipesData = [];
let searchTextUser = ""

// DOM
const recipeSection = document.getElementById("recips");
const resultRecipes = document.querySelector(".filters__result");
const resultError = document.querySelector(".result__error");
const inputSearch = document.getElementById("search");
const resetSearch = document.querySelector(".header__close");
const form = document.getElementById("search-form");

const displayRecipes = (recipesData) => {

  const quantityRecipes = recipesData.length;

  if (quantityRecipes > 0 ) {
    resultError.textContent = "";
    recipesData.forEach((recipe) => {
      const recipModel = recipeFactory(recipe);
      const recipesPageDOM = recipModel.getRecipeCardDOM();
      recipeSection.appendChild(recipesPageDOM);
      });
  } else {
    resultError.textContent = `Aucune recette ne contient '${searchTextUser}'. Veuillez effectuer une nouvelle recherche.`;
  }

  resultRecipes.textContent = `${quantityRecipes} recette${quantityRecipes > 1 ? 's' : ''}`;

  if (!searchTextUser) {
    resetSearch.classList.add("hidden");
  }

}

const searchRecipes = (event) => {
  resetSearch.classList.remove("hidden");
  searchTextUser = event.target.value.toLowerCase();
  const searchResults = displaySearchRecipes(searchTextUser, recipesData);
  recipeSection.textContent = "";
  displayRecipes(searchResults); 
};

const resetForm = () => {
  form.reset();
  resetSearch.classList.add("hidden");
}

inputSearch.addEventListener("input", searchRecipes);
resetSearch.addEventListener("click", resetForm);

async function init() {
	recipesData = recipes;
  displayRecipes(recipesData);
}

init();

