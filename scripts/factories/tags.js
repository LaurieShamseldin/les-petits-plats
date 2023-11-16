export default function tagFactory(tag) {

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  const getTagDropdownDOM = () => {
    const li = document.createElement("li");
    li.classList.add("filter-tag");
    li.textContent = capitalizeFirstLetter(tag);
    li.dataset.tag = tag.toLowerCase();

    return li;
  }

  const getTagActiveDOM = () => {
    const tagElement = document.createElement("div");
    tagElement.classList.add("tag__active");
    tagElement.textContent = capitalizeFirstLetter(tag);
    tagElement.dataset.tag = tag.toLowerCase();

    const nameTag = document.createElement("div");
    nameTag.classList.add("tag__active-name");
   
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-xmark");
    icon.dataset.tag = tag.toLowerCase();

    tagElement.appendChild(nameTag);
    tagElement.appendChild(icon);

    return tagElement;

  }
  return { getTagDropdownDOM, getTagActiveDOM };
  
}
