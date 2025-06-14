import { fetchData } from "./components/Fetch/fetch.js";
import {
  createSearchForm,
  searchListener,
} from "./components/SearchBar/SearchBar.js";
import createCards from "./components/CharacterCard/CharacterCard.js";

// const cardContainer = document.querySelector('[data-js="card-container"]');
const main = document.querySelector("main");

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

//Main container for our form
const searchContainer = document.querySelector("header");
searchContainer.classList.add("search-bar-container");
searchContainer.setAttribute("data-js", "search-bar-container");

const searchError = document.createElement("p"); //Error container. Classes can be added for styling etc...

let searchData;

const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');
//Loads the initial data. I've amended the fetch logic so you will get back everything.
//This means that you can access the pagination object(info) as well. As shown below.
let fetchedData = await fetchData();
// console.log(fetchedData.results); // I've logged it but here we should call the create card function
// console.log(fetchedData.info); // Pagination info

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
    console.log(searchData); // or get the search results
  }
});

main.append(createCards(fetchedData.results));

/////////////////////////////////
//pagination
const pageTurn = async (next) => {
  const fetching = await fetchData(fetchedData.info.next);
  main.innerHTML = "";
  main.append(createCards(fetching.results));
  fetchedData = fetching;
};

nextButton.addEventListener("click", pageTurn)
// nextButton.addEventListener("click", async () => {
//   const fetching = await fetchData(fetchedData.info.next);
//   main.innerHTML = ""
//   main.append(createCards(fetching.results))
//   fetchedData = fetching
// });
