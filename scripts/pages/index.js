import recipes from '../../data/recipes.js';
import recipeFactory from '../factories/recipe.js';


const displayRecipes = (recipesData) => {
  console.log(typeof recipesData);
  const recipeSection = document.getElementById("recips");
  recipesData.forEach((recipe) => {
    const recipModel = recipeFactory(recipe);
    const recipesPageDOM = recipModel.getRecipeCardDOM();
    recipeSection.appendChild(recipesPageDOM);
  });

}


async function init() {
	const recipesData = recipes;
  displayRecipes(recipesData);
}

init();

