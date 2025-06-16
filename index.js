//////////////////////
// Imports
import { pageRender } from "./components/pageRender/pageRender.js";
import { fetchData } from "./components/Fetch/fetch.js";
import { createSearchForm } from "./components/SearchBar/SearchBar.js";

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

//Call our form creator and where to put it (searchContainer)
const { searchForm, input, resetButton } = createSearchForm(searchContainer);
let searchData;

//This the listener for the search form
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let searchQuery = input.value;
  input.value = "";

  if (searchQuery) {
    searchData = await fetchData(
      `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(
        searchQuery
      )}`
    );
  }

  //   //Here we handle if there are no characters returned from the API
  if (searchData.error) {
    searchError.textContent = searchData.error;
    searchContainer.append(searchError);
  } else {
    searchError.remove();
    pageRender(searchData, "is search");
    // to make the rest of the code, aka the page buttons,  work with the new data:
    fetchedData = searchData;
  }
});

// Add reset button listener
resetButton.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent default button behavior

  // Clear input and remove error if it exists
  input.value = "";
  if (searchError.textContent) searchError.remove();

  // Fetch and show the full character list again
  searchData = await fetchData(`https://rickandmortyapi.com/api/character/`);

  pageRender(searchData, "is search");
  fetchedData = searchData;
});

//////////////////////
// PAGINATION

// add pagination button functionality
nextButton.addEventListener("click", async () => {
  //check if a search is happening
  return (fetchedData = await pageRender(fetchedData, false, "next"));
});

prevButton.addEventListener(
  "click",
  async () => (fetchedData = await pageRender(fetchedData, false, "prev"))
);
