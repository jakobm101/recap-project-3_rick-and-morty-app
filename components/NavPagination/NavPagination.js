import { fetchData, URL } from "../Fetch/fetch.js";
import createCards from "../CharacterCard/CharacterCard.js";
const pagination = document.querySelector('[data-js="pagination"]');
const main = document.querySelector("main");

export const pageRender = async (data = null, pageToRender = URL ) => {
  let currentPage = pageToRender?.split("=")[1] || "1";
// the fetch is actually coming from the module not from index
  // 
  let fetching = await fetchData(pageToRender);

  // fallback if the new page does not exist
  if (typeof fetching !== "object") fetching = await fetchData();

  main.innerHTML = "";
  main.append(createCards(fetching.results));
  pagination.textContent = `${currentPage}／${fetching.info.pages}`;
  return fetching;
};
