import { fetchData, URL as startPage } from "../Fetch/fetch.js";
import createCards from "../CharacterCard/CharacterCard.js";
const pagination = document.querySelector('[data-js="pagination"]');
const main = document.querySelector("main");
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

export const pageRender = async (currentData, isSearch, prevOrNext) => {
  //check if next or previous page should be rendered
  let pageToRender = startPage; // initial case
  if (prevOrNext === "next") pageToRender = currentData.info.next;
  if (prevOrNext === "prev") pageToRender = currentData.info.prev;

  // fetch data if not searching
  let data = isSearch ? currentData : await fetchData(pageToRender);

  //create cards and update related components
  if (data.results) {
    main.innerHTML = "";
    main.append(createCards(data.results));

    // Disable Buttons if no next or previous page available
    data.info.prev
      ? (prevButton.disabled = false)
      : (prevButton.disabled = true);
    data.info.next
      ? (nextButton.disabled = false)
      : (nextButton.disabled = true);

    // update Page numbers
    const urlPage = new URL(pageToRender).searchParams?.get('page')
    pagination.textContent = `${urlPage ?? 1}／${data.info.pages}`;

    // RETURN
    return data;
  }
  // Return previous data if not updating page, so index functions keep the state
  return currentData;
};
