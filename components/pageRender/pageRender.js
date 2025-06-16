import { fetchData, URL } from "../Fetch/fetch.js";
import createCards from "../CharacterCard/CharacterCard.js";
const pagination = document.querySelector('[data-js="pagination"]');
const main = document.querySelector("main");
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

export const pageRender = async (currentData, isSearch, prevOrNext) => {
  //check if next or previous page should be rendered
  let pageToRender = URL;
  if (prevOrNext === "next") pageToRender = currentData.info.next;
  if (prevOrNext === "prev") pageToRender = currentData.info.prev;

  // fetch data if not searching
  let data = isSearch ? currentData : await fetchData(pageToRender);

  //create cards
  if (typeof data === "object") {
    main.innerHTML = "";
    main.append(createCards(data.results));

    // Disable Buttons if no next or previous page available
    data.info.prev
      ? (prevButton.disabled = false)
      : (prevButton.disabled = true);
    data.info.next
      ? (nextButton.disabled = false)
      : (nextButton.disabled = true);

    // insert Page numbers
    const match = pageToRender?.match(/[?&]page=(\d+)/);
    const currentPage = match ? parseInt(match[1]) : 1;
    pagination.textContent = `${currentPage}／${data.info.pages}`;

    // RETURN
    return data;
  }
  return currentData;
};
