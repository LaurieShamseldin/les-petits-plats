export default function recipeFactory(data) {
  const { image, name, ingredients, time, description } = data;

  const getRecipeCardDOM = () => {

    const article = document.createElement("article");
    article.classList.add("recip__card", "card");

    const header = document.createElement("div");
    header.classList.add("card__header");

    const img = document.createElement("img");
    img.classList.add("card__img");
    img.src = `/assets/images/${image}`;
    img.alt = name;
    header.appendChild(img);

    const delay = document.createElement("span");
    delay.classList.add("card__delay");
    delay.textContent = `${time}min`;
    header.appendChild(delay);

    const content = document.createElement("div");
    content.classList.add("card__content");

    const title = document.createElement("h2");
    title.classList.add("card__title");
    title.textContent = name;
    content.appendChild(title);
    
    const recette = document.createElement("span");
    recette.classList.add("card__title--step");
    recette.textContent = "Recette";
    content.appendChild(recette);

    const recetteDescription = document.createElement("p");
    recetteDescription.classList.add("card__text");
    recetteDescription.textContent = description;
    content.appendChild(recetteDescription);

    const ingredient = document.createElement("span");
    ingredient.classList.add("card__title--step");
    ingredient.textContent = "Ingredients";
    content.appendChild(ingredient);

    const cardIngredients = document.createElement("div");
    cardIngredients.classList.add("card-ingredients");
    content.appendChild(cardIngredients);

    ingredients.forEach((ingredient) => {
      const ingredientContent = document.createElement("div");
      ingredientContent.classList.add("card__ingredient");
      cardIngredients.appendChild(ingredientContent);

      const nameIngredient = document.createElement("span");
      nameIngredient.classList.add("card__ingredient--name");
      nameIngredient.textContent = ingredient.ingredient;
      ingredientContent.appendChild(nameIngredient);

      if (ingredient.quantity) {
        if (ingredient.unit) {
          const ingredientQuantity = document.createElement("span");
          ingredientQuantity.classList.add("card__ingredient--quantity");
          ingredientQuantity.textContent = `${ingredient.quantity} ${ingredient.unit}`;
          ingredientContent.appendChild(ingredientQuantity);
        } else {
          const ingredientQuantity = document.createElement("span");
          ingredientQuantity.classList.add("card__ingredient--quantity");
          ingredientQuantity.textContent = ingredient.quantity;
          ingredientContent.appendChild(ingredientQuantity);
        }
      }
    })

    article.appendChild(header);
    article.appendChild(content);

    return article;
     
  }
  return { getRecipeCardDOM};
}
