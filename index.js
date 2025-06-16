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
const main = document.querySelector("main");
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";
let fetchedData = await fetchData();

//////////////////////
// Search

//Main container for our form
const searchContainer = document.querySelector("header");
searchContainer.classList.add("search-bar-container");
searchContainer.setAttribute("data-js", "search-bar-container");

const searchError = document.createElement("p"); //Error container. Classes can be added for styling etc...
let searchData;

//Call our form creator and where to put it (searchContainer)
const { searchForm, input } = createSearchForm(searchContainer);

//This the listener for the search form
searchListener(searchForm, input, async (searchQuery) => {
  if (!searchQuery) return;
  searchData = await fetchData(
    `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(
      searchQuery
    )}`
  );

  //Here we handle if there are no characters returned from the API
  if (searchData.name === "Error") {
    searchError.textContent = searchData.message;
    searchContainer.append(searchError);
  } else {
    // console.log('😸 SearchData',searchData); // or get the search results
    pageRender(searchData)
  }
});

//////////////////////
// PAGINATION

// initialize pagination and cards
pageRender();

// add button functionality
nextButton.addEventListener(
  "click",
  async () => (fetchedData = await pageRender(null, fetchedData.info.next))
);
prevButton.addEventListener(
  "click",
  async () => (fetchedData = await pageRender(null, fetchedData.info.prev))
);
