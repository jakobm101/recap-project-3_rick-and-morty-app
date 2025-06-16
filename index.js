//////////////////////
// Imports
import { pageRender } from "./components/NavPagination/NavPagination.js";
import { fetchData } from "./components/Fetch/fetch.js";
import {
  createSearchForm,
  searchListener,
} from "./components/SearchBar/SearchBar.js";

//////////////////////
// Variables

// html selectors
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

// States
let fetchedData = await fetchData();

// INITIAL RENDER OF CARDS
// initialize pagination and cards
pageRender();

//////////////////////
// Search

//Main container for our form
const searchContainer = document.querySelector("header");
searchContainer.classList.add("search-bar-container");
searchContainer.setAttribute("data-js", "search-bar-container");

const searchError = document.createElement("p"); //Error container. Classes can be added for styling etc...
let searchData;

//Call our form creator and where to put it (searchContainer)
const { searchForm, input, resetButton } = createSearchForm(searchContainer);

//This the listener for the search form
searchListener(searchForm, input, async searchQuery => {
  if (!searchQuery) return;

  searchData = await fetchData(
    `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(
      searchQuery
    )}`
  );

  //Here we handle if there are no characters returned from the API
  if (searchData.error) {
    searchError.textContent = searchData.error;
    searchContainer.append(searchError);
  } else {
    searchError.remove();
    pageRender(searchData, null, searchData);
    // to make the rest of the code, aka the page buttons,  work with the new data:
    fetchedData = searchData;
  }
});

//////////////////////
// PAGINATION

// add pagination button functionality
nextButton.addEventListener("click", async () => {
  //check if a search is happening
  return (fetchedData = await pageRender(
    null,
    fetchedData.info.next,
    fetchedData
  ));
});

prevButton.addEventListener(
  "click",
  async () =>
    (fetchedData = await pageRender(null, fetchedData.info.prev, fetchedData))
);
