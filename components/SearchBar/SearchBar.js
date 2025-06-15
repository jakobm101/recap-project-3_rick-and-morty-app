//This code creates a form into the header.
//This includes the listener logic. The only way to handle this was with a callback function.

// export const createSearchForm = (searchContainer) => {
//   const section = document.createElement("section");
//   const searchForm = document.createElement("form");
//   searchForm.classList.add("search-bar_form");
//   searchForm.setAttribute("data-js", "search-bar_form");
//   const input = document.createElement("input");
//   input.classList.add("search-bar__input");
//   input.setAttribute("name", "query");
//   input.setAttribute("type", "text");
//   input.setAttribute("placeholder", "search characters");
//   input.setAttribute("aria-label", "character name");
//   const button = document.createElement("button");
//   button.classList.add("search-bar__button");
//   button.setAttribute("aria-label", "search for character");
//   button.textContent = "Submit";

//   searchForm.append(input);
//   searchForm.append(button);
//   section.append(searchForm);
//   searchContainer.append(section);

//   return { searchForm, input };
// };

export const createSearchForm = (container) => {
  const form = document.createElement("form");
  form.id = "searchForm"; // <-- important
  const input = document.createElement("input");
  input.id = "searchInput"; // <-- important
  input.type = "text";
  input.placeholder = "search characters";
  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Search";

  form.append(input, button);
  container.append(form);

  return { form, input };
};

//Listener taking in arguments of form, input and the callback function
// export const searchListener = async (searchForm, input, callBackFunction) => {
//   searchForm.addEventListener("submit", event => {
//     event.preventDefault();
//     callBackFunction(input.value);
//   });
// };
