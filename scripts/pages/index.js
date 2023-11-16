import recipes from '../../data/recipes.js';
import recipeFactory from '../factories/recipe.js';
import { displaySearchRecipes, displaySearchRecipesWithTags } from '../utils/search.js';
import { allIngredients, allAppareils, allUstensiles } from '../utils/tags.js';
import tagFactory from '../factories/tags.js';
import { filterTagsSearch } from '../utils/dropdowns.js';


let recipesData = [];
let searchTextUser = ""
let ingredientsTags = [];
let ustensilesTags = [];
let appareilsTags = [];

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
const inputDropdowns = document.querySelectorAll(".filters__search-input");
const liActiveTags = document.querySelector(".list-tags-active");

// Affichage des recettes
const displayRecipes = (recipesData) => {

  const quantityRecipes = recipesData.length;
  // Affichage des recettes si une au moins est disponible
  if (quantityRecipes > 0 ) {
    resultError.textContent = "";
    recipesData.forEach((recipe) => {
      const recipModel = recipeFactory(recipe);
      const recipesPageDOM = recipModel.getRecipeCardDOM();
      recipeSection.appendChild(recipesPageDOM);
      });

   // Affichage du texte au singulier ou pluriel
   resultRecipes.textContent = `${quantityRecipes} recette${quantityRecipes > 1 ? 's' : ''}`;

   // Affichage par défaut de tous les tags 
   displayTags(recipesData);
      // Si pas de recettes disponibles, affichage d'un message d'erreur
  } else {
    resultError.textContent = `Aucune recette ne contient '${searchTextUser}'. Veuillez effectuer une nouvelle recherche.`;
  }

  if (!searchTextUser) {
    resetSearch.classList.add("hidden");
  };
}

// Affichage des dropdown des tags
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

// Recherche de l'utilisateur et affichage des recettes en conséquence
const searchRecipes = (event) => {
  resetSearch.classList.remove("hidden");
  searchTextUser = event.target.value.toLowerCase();
  const searchResults = displaySearchRecipes(searchTextUser, displaySearchRecipesWithTags(ingredientsTags, ustensilesTags, appareilsTags, recipesData));
  recipeSection.textContent = "";
  displayTags(searchResults);
  displayRecipes(searchResults); 
};

// Reset du formulaire de recherche
const resetForm = () => {
  form.reset();
  resetSearch.classList.add("hidden");
}

inputSearch.addEventListener("input", searchRecipes);
resetSearch.addEventListener("click", resetForm);


const displayTags = (list) => {
  // Je récupère mes tags que je stocke dans une variable
  let ingredientsArray = allIngredients(list);
  let appareilsArray = allAppareils(list);
  let ustensilesArray = allUstensiles(list);

  // Filtre des tags en fonction de la recherche
  const ingredientsSearchTags = filterTagsSearch(ingredientsInput.value.toLowerCase(), ingredientsArray);
  const appareilsSearchTags = filterTagsSearch(appareilsInput.value.toLowerCase(), appareilsArray);
  const ustensilesSearchTags = filterTagsSearch(ustensilesInput.value.toLowerCase(), ustensilesArray);

  // Récupération des tags des recettes actuellement affichées après la recherche
  const displayedRecipes = displaySearchRecipesWithTags(ingredientsTags, ustensilesTags, appareilsTags, recipesData);
  const ingredientsInDisplayedRecipes = allIngredients(displayedRecipes);
  const appareilsInDisplayedRecipes = allAppareils(displayedRecipes);
  const ustensilesInDisplayedRecipes = allUstensiles(displayedRecipes);

  // Recalcul des tags en fonction des recettes actuellement affichées
  ingredientsArray = ingredientsInDisplayedRecipes;
  appareilsArray = appareilsInDisplayedRecipes;
  ustensilesArray = ustensilesInDisplayedRecipes;

  // Filtrage des tags pour n'afficher que ceux des recettes actuellement affichées
  const filteredIngredients = ingredientsArray.filter(tag => ingredientsSearchTags.includes(tag));
  const filteredAppareils = appareilsArray.filter(tag => appareilsSearchTags.includes(tag));
  const filteredUstensiles = ustensilesArray.filter(tag => ustensilesSearchTags.includes(tag));

  // Affichage des tags filtrés dans les listes correspondantes
  displayFilteredTags(filteredIngredients, listIngredients);
  displayFilteredTags(filteredAppareils, listAppareils);
  displayFilteredTags(filteredUstensiles, listUstensiles);

};

const displayFilteredTags = (tagsArray, listElement) => {
  listElement.textContent = ""; // Nettoyage de la liste actuelle

  tagsArray.forEach(tag => {
    const tagModel = tagFactory(tag);
    const tagPageDOM = tagModel.getTagDropdownDOM();
    listElement.appendChild(tagPageDOM);
    const listId = listElement.id;
    const typeTag = listId.split('-')[0];
    
    const tagDropDown = tagPageDOM.closest('.filters__btn').querySelector('button');

    tagPageDOM.addEventListener("click", () => {
      const dataTagValue = tagPageDOM.getAttribute('data-tag');
      displayDropDown(tagDropDown);

      switch (typeTag) {
        case 'ingredients':
            if (!ingredientsTags.includes(dataTagValue)) {
              addActiveTag(tag, dataTagValue, ingredientsTags);
            } 
            break;

          case 'appareils':
            if (!appareilsTags.includes(dataTagValue)) {
              addActiveTag(tag, dataTagValue, appareilsTags);
            } 
            break;

          case 'ustensiles':
            if (!ustensilesTags.includes(dataTagValue)) {
              addActiveTag(tag, dataTagValue, ustensilesTags);
            } 
            break;
      }
    });
  });
};


const addActiveTag = (tag, tagName, typeTag) => {
  recipeSection.textContent = "";
  // Intégration du tag dans le tableau
  typeTag.push(tagName);
  // Affichage de mon tag sélectionné
  const tagActive = tagFactory(tag);
  const tagActiveDom = tagActive.getTagActiveDOM();
  liActiveTags.appendChild(tagActiveDom);

  const hideIcon = tagActiveDom.querySelector("i");
  hideIcon.addEventListener("click", () => hideTag(tagActiveDom, tagName, typeTag));
  const allTags = displaySearchRecipes(searchTextUser, displaySearchRecipesWithTags(ingredientsTags, ustensilesTags, appareilsTags, recipesData));

  displayRecipes(allTags);
} 

const removeActiveTag = (tagName, tagsArray) => {
  recipeSection.textContent = "";
  const index = tagsArray.indexOf(tagName);
  if (index !== -1) {
    tagsArray.splice(index, 1);
  }

  const allTags = displaySearchRecipes(searchTextUser, displaySearchRecipesWithTags(ingredientsTags, ustensilesTags, appareilsTags, recipesData));

  displayRecipes(allTags);
}

// Fonction pour masquer mon tag et l'enlever du tableau
const hideTag = (element, tagName, typeTag) => {
  // Suppresion du nom du tag dans le dom
  element.remove();
  // Tag retiré du tableau
  removeActiveTag(tagName, typeTag);
}


const init = () => {
	recipesData = recipes;
  // Affichage des recettes
  displayRecipes(recipesData);
  
  // Affichage des tags associés en fonction de la recherche dans l'input
  inputDropdowns.forEach((inputDropDown) => {
    inputDropDown.addEventListener("input", () => {
      displayTags(recipesData);
    })
  });


  // Au clic sur le bloc affichage des dropdowns
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", () => {
      displayDropDown(dropdown);
    });
  });
}

init();

