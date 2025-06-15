//////////////////////
// Imports
import { pageTurn } from "./components/NavPagination/NavPagination.js";
import { fetchData } from "./components/Fetch/fetch.js";
import { createSearchForm } from "./components/SearchBar/SearchBar.js";
import createCards from "./components/CharacterCard/CharacterCard.js";

//////////////////////
// Variables

// html selectors
const main = document.querySelector("main");
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const paginationDisplay = document.querySelector('[data-js="pagination"]');

// States
let searchQuery = "";
let currentPage = 1;
let fetchedData;

//////////////////////
// Search

// //Main container for our form
// const searchContainer = document.querySelector("header");
// searchContainer.classList.add("search-bar-container");
// searchContainer.setAttribute("data-js", "search-bar-container");

// const searchError = document.createElement("p"); //Error container. Classes can be added for styling etc...
// let searchData;

// //Call our form creator and where to put it (searchContainer)
// const { searchForm, input } = createSearchForm(searchContainer);

// //This the listener for the search form
// searchListener(searchForm, input, async (searchQuery) => {
//   if (!searchQuery) return;
//   searchData = await fetchData(
//     `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(
//       searchQuery
//     )}`
//   );

//   //Here we handle if there are no characters returned from the API
//   if (searchData.name === "Error") {
//     searchError.textContent = searchData.message;
//     searchContainer.append(searchError);
//   } else {
//     console.log(searchData); // or get the search results
//   }
// });

function addSearch() {
  const header = document.querySelector("header");
  const { form, input } = createSearchForm(header);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    searchQuery = input.value.trim();
    currentPage = 1;
    fetchedData = await pageTurn(null, searchQuery, currentPage);
  });
}

async function addPaginationButtons() {
  nextButton.addEventListener("click", async () => {
    if (fetchedData.info.next) {
      fetchedData = await pageTurn(fetchedData.info.next, searchQuery);
    }
  });

  prevButton.addEventListener("click", async () => {
    if (fetchedData.info.prev) {
      fetchedData = await pageTurn(fetchedData.info.prev, searchQuery);
    }
  });
}

(async function init() {
  addSearch();
  await addPaginationButtons();
  fetchedData = await pageTurn(null, searchQuery, currentPage);
})();

//////////////////////
// PAGINATION

// initialize pagination and cards
pageTurn();

// add button functionality
nextButton.addEventListener(
  "click",
  async () => (fetchedData = await pageTurn(fetchedData.info.next))
);
prevButton.addEventListener(
  "click",
  async () => (fetchedData = await pageTurn(fetchedData.info.prev))
);
