/* eslint-disable max-len */
const allIngredients = (data) => {
  const ingredientsArray = data
    .map((recipe) => recipe.ingredients) // Obtient tous les tableaux d'ingrédients
    .flat() // Aplatit tous les tableaux d'ingrédients en un seul tableau
    .map((ingredient) => ingredient.ingredient.toLowerCase()) // Met les ingrédients en minuscules
    .filter((ingredient, index, array) => array.indexOf(ingredient) === index); // Filtre pour les ingrédients uniques

  return ingredientsArray;
};

const allAppareils = (data) => {
  const appareilsArray = data
    .map((recipe) => recipe.appliance) // Obtient tous appareils
    .flat() // Aplatit tous les tableaux d'ingrédients en un seul tableau
    .map((appareil) => appareil.toLowerCase()) // Met les appareils en minuscule
    .filter((appareil, index, array) => array.indexOf(appareil) === index); // Filtre pour les ingrédients uniques

  return appareilsArray;
};

const allUstensiles = (data) => {
  const ustensilesArray = data
    .map((recipe) => recipe.ustensils) // Obtient tous appareils
    .flat() // Aplatit tous les tableaux d'ingrédients en un seul tableau
    .map((ustensil) => ustensil.toLowerCase()) // Met les appareils en minuscule
    .filter((ustensil, index, array) => array.indexOf(ustensil) === index); // Filtre pour les ingrédients uniques

  return ustensilesArray;
};
export { allIngredients, allAppareils, allUstensiles };
