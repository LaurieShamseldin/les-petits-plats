import recipes from '../../data/recipes.js';
import recipeFactory from '../factories/recipe.js';


const displayRecipes = (recipesData) => {
  console.log(recipesData);
  
}


async function init() {
	const recipesData = recipes;
  displayRecipes(recipesData);
}

init();

