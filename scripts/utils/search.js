const displaySearchRecipes = (search, data) => {
  let arraySearch = [];
  if (search.length > 2) {
    for (let i = 0; i < data.length; i++) {
      let searchFind = false;
      const recipe = data[i];
      const ingredients = recipe.ingredients;

      if (recipe.name.toLowerCase().includes(search) || recipe.description.toLowerCase().includes(search))  {
        searchFind = true;
      } 

      for (let ig = 0; ig < ingredients.length; ig++) {
        if (ingredients[ig].ingredient.toLowerCase().includes(search)) {
          searchFind = true;
        } 
      }
      if (searchFind) {
        arraySearch.push(recipe);
      }
    }
  } 
  else {
    arraySearch = data;
  }

  return arraySearch;
}


export { displaySearchRecipes };
