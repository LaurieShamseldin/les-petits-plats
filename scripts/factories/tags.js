export default function tagFactory(tag) {
  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  const getTagDropdownDOM = () => {
    const li = document.createElement("li");
    li.classList.add("filters-tag");
    li.textContent = capitalizeFirstLetter(tag);
    li.dataset.tag = tag.toLowerCase();

    return li;
     
  }
  return { getTagDropdownDOM };
  
}
