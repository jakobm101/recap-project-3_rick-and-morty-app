//This code creates a form into the header.

export const createSearchForm = searchContainer => {
  const section = document.createElement("section");
  const searchForm = document.createElement("form");
  searchForm.classList.add("search-bar_form");
  searchForm.setAttribute("data-js", "search-bar_form");
  const input = document.createElement("input");
  input.classList.add("search-bar__input");
  input.setAttribute("name", "query");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "search characters");
  input.setAttribute("aria-label", "character name");
  const button = document.createElement("button");
  button.classList.add("search-bar__button");
  button.setAttribute("aria-label", "search for character");
  button.textContent = "Submit";
  const resetButton = document.createElement("button");
  resetButton.classList.add("search-reset__button");
  resetButton.setAttribute("aria-label", "reset characters");
  resetButton.textContent = "Reset";

  searchForm.append(input, button, resetButton);

  section.append(searchForm);
  searchContainer.append(section);

  return { searchForm, input, resetButton };
};
