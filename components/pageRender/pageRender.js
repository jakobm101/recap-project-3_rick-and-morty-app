import { fetchData, URL as startPage } from "../Fetch/fetch.js";
import createCards from "../CharacterCard/CharacterCard.js";
const pagination = document.querySelector('[data-js="pagination"]');
const main = document.querySelector("main");
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

export const pageRender = async (importedData, isSearch, prevOrNext) => {
  //check if next or previous page should be rendered
  let pageToRender = startPage; // initial case
  if (prevOrNext === "next") pageToRender = importedData.info.next;
  if (prevOrNext === "prev") pageToRender = importedData.info.prev;
  if (prevOrNext !== "next" && prevOrNext !== "prev" && prevOrNext) log.error("wrong input");

  // fetch data if not searching
  let data = isSearch ? importedData : await fetchData(pageToRender);

  //create cards and update related components
  main.innerHTML = "";
  main.append(createCards(data.results));

  // Disable Buttons if no next or previous page available
  data.info.prev ? (prevButton.disabled = false) : (prevButton.disabled = true);
  data.info.next ? (nextButton.disabled = false) : (nextButton.disabled = true);

  // update Page numbers
  const urlPage = new URL(pageToRender).searchParams?.get("page");
  pagination.textContent = `${urlPage ?? 1}／${data.info.pages}`;

  // RETURN state
  return data;
};
