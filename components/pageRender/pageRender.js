import { fetchData, URL as startPage } from "../Fetch/fetch.js";
import createCards from "../CharacterCard/CharacterCard.js";

const pagination = document.querySelector('[data-js="pagination"]');
const main = document.querySelector("main");
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

export const pageRender = async (importedData, isSearch, prevOrNext) => {
  //check if next or previous page should be rendered
  let pageToRender = startPage;
  switch (prevOrNext) {
    case undefined:
      pageToRender = startPage;
      break;
    case "next":
      pageToRender = importedData.info.next;
      break;
    case "prev":
      pageToRender = importedData.info.prev;
      break;
    default:
      console.error(
        "wrong parameter for pageRender. Expecting undefined, next or prev."
      );
  }

  // fetch data if not searching
  let data = isSearch ? importedData : await fetchData(pageToRender);

  //create cards and update related components
  main.innerHTML = "";
  main.append(createCards(data.results));

  // Disable Buttons if no next or previous page available
  data.info.prev ? (prevButton.disabled = false) : (prevButton.disabled = true);
  data.info.next ? (nextButton.disabled = false) : (nextButton.disabled = true);

  // update Page numbers   n/n
  const pageNumber = new URL(pageToRender).searchParams?.get("page");
  pagination.textContent = `${pageNumber ?? 1}／${data.info.pages}`;

  // RETURN state
  return data;
};
