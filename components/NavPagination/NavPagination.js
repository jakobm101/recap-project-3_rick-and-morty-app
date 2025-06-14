import { fetchData } from "../Fetch/fetch.js";
import createCards from "../CharacterCard/CharacterCard.js";
const pagination = document.querySelector('[data-js="pagination"]');
const main = document.querySelector("main");

export const pageTurn = async (next) => {
  let currentPage = next.split('=')[1]
  console.log(typeof next);
  
  let fetching = await fetchData(next);

  // fallback if the new page does not exist
  if (typeof fetching.results !== "object") fetching = await fetchData();

  main.innerHTML = "";
  main.append(createCards(fetching.results));
  pagination.textContent = `${currentPage}/${fetching.info.pages}`;
  return fetching;
};
