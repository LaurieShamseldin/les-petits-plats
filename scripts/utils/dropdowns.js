/* eslint-disable import/prefer-default-export */
const filterTagsSearch = (inputSearch, tags) => {
  const filteredTags = tags.filter(
    (tag) => tag.toLowerCase().includes(inputSearch),
  );
  return filteredTags;
};

export { filterTagsSearch };
