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


export { displaySearchRecipes };
