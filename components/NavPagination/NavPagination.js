import { fetchData, URL } from "../Fetch/fetch.js";
import createCards from "../CharacterCard/CharacterCard.js";
const pagination = document.querySelector('[data-js="pagination"]');
const main = document.querySelector("main");

export const pageRender = async (data = null, pageToRender = URL) => {
  // data is coming from search in index.js and fetches there
  // pageToRender is coming from index but fetches here
  let currentPage = pageToRender?.split("=")[1] || "1";
  // the fetch is actually coming from the module not from index
  // but now i need to add data
  
  let fetching;
  if (!data && pageToRender) fetching = await fetchData(pageToRender);

  // fallback if the new page does not exist: create page one
  if (!data && typeof fetching !== "object") fetching = await fetchData();

  if (data) fetching = data;
  
  main.innerHTML = "";
  main.append(createCards(fetching.results));
  pagination.textContent = `${currentPage}／${fetching.info.pages}`;
  return fetching;
};
