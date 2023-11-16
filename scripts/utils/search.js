const displaySearchRecipes = (search, data) => {
  if (search.length <= 2) {
    return data;
  }

  return data.filter(recipe => {
    const recipeName = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();
    const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());

    return recipeName.includes(search) || recipeDescription.includes(search) || ingredients.some(ig => ig.includes(search));
  });
};


const displaySearchRecipesWithTags = (ingredientsTags, ustensilesTags, appareilsTags, data) => {
  // Filtrer les recettes en fonction des tags d'ingrédients, d'ustensiles et d'appareils
  return data.filter(recipe => {
    // Vérification des tags d'ingrédients
    const hasAllIngredients = ingredientsTags.every(tag => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tag.toLowerCase()));
     // Vérification des tags d'appareils
    const hasAllAppareils = appareilsTags.every(tag => recipe.appliance.toLowerCase() === tag.toLowerCase());
    // Vérification des tags d'ustensiles
    const hasAllUstensiles = ustensilesTags.every(tag =>
      recipe.ustensils.some(ustensile =>
        ustensile.toLowerCase() === tag.toLowerCase()
      )
    );

    // Retourner true si la recette possède tous les tags spécifiés pour ingrédients, ustensiles et appareils
    return hasAllIngredients && hasAllUstensiles && hasAllAppareils;
  });
};



export { displaySearchRecipes, displaySearchRecipesWithTags };
