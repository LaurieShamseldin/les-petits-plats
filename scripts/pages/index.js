import recipes from '../../data/recipes.js';
import recipeFactory from '../factories/recipe.js';
import { displaySearchRecipes } from '../utils/search.js';
import { allIngredients, allAppareils, allUstensiles } from '../utils/tags.js';
import tagFactory from '../factories/tags.js';
import { filterTagsSearch } from '../utils/dropdowns.js';


let recipesData = [];
let searchTextUser = ""

// DOM
const recipeSection = document.getElementById("recips");
const resultRecipes = document.querySelector(".filters__result");
const resultError = document.querySelector(".result__error");
const inputSearch = document.getElementById("search");
const resetSearch = document.querySelector(".header__close");
const form = document.getElementById("search-form");
const dropdowns = document.querySelectorAll(".filters__btn .btn-filters");
const listIngredients = document.getElementById("ingredients-items");
const listAppareils = document.getElementById("appareils-items");
const listUstensiles = document.getElementById("ustensiles-items");
const ingredientsInput = document.getElementById("filters-ingredients");
const appareilsInput = document.getElementById("filters-appareils");
const ustensilesInput = document.getElementById("filters-ustensiles");
const inputDropdowns = document.querySelectorAll('.filters__search-input');

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
  };

  displayTags();

}

const displayDropDown = (dropdown) => {
  const parentElement = dropdown.parentNode;
  const filtersTag = parentElement.querySelector('.filters__tag');
  if (filtersTag.classList.contains("hidden")) {
   const chevron = dropdown.querySelector(".fa-chevron-down");
   chevron.classList.remove("fa-chevron-down");
   chevron.classList.add("fa-chevron-up");

   filtersTag.classList.remove("hidden");

  } else {
    const chevron = dropdown.querySelector(".fa-chevron-up");
    chevron.classList.remove("fa-chevron-up");
    chevron.classList.add("fa-chevron-down"); 

    filtersTag.classList.add("hidden");
  }
}

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", () => {
    displayDropDown(dropdown);
  });
});


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

const displayTags = () => {
  let ingredientsArray = allIngredients(recipesData);
  let appareilsArray = allAppareils(recipesData);
  let ustensilesArray = allUstensiles(recipesData);

  const ingredientsSearchTags = filterTagsSearch(ingredientsInput.value.toLowerCase(), ingredientsArray);
  const appareilsSearchTags = filterTagsSearch(appareilsInput.value.toLowerCase(), appareilsArray);
  const ustensilesSearchTags = filterTagsSearch(ustensilesInput.value.toLowerCase(), ustensilesArray);

  console.log(appareilsInput.value);

  listIngredients.textContent = "";
  listAppareils.textContent = "";
  listUstensiles.textContent = "";

  ingredientsSearchTags.forEach((ingredient) => {
    const tagModel = tagFactory(ingredient);
    const tagPageDOM = tagModel.getTagDropdownDOM();
    listIngredients.appendChild(tagPageDOM);
  });

  appareilsSearchTags.forEach((appareil) => {
      const tagModel = tagFactory(appareil);
      const tagPageDOM = tagModel.getTagDropdownDOM();
      listAppareils.appendChild(tagPageDOM);
    });

    ustensilesSearchTags.forEach((ustensile) => {
      const tagModel = tagFactory(ustensile);
      const tagPageDOM = tagModel.getTagDropdownDOM();
      listUstensiles.appendChild(tagPageDOM);
    });
}


const init = () => {
	recipesData = recipes;
  displayRecipes(recipesData);
  inputDropdowns.forEach((inputDropDown) => {
    inputDropDown.addEventListener("input", () => {
      displayTags();
    })
  });


}

init();

