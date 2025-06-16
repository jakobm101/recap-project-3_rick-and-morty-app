import { fetchData, URL } from "../Fetch/fetch.js";
import createCards from "../CharacterCard/CharacterCard.js";
const pagination = document.querySelector('[data-js="pagination"]');
const main = document.querySelector("main");
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

export const pageRender = async (
  data = null,
  pageToRender = URL,
  oldData,
  prevOrNext
) => {
  // data is coming from search in index.js and fetches there
  // pageToRender is coming from index but fetches here
  // the fetch is actually coming from the module not from index
  const match = pageToRender?.match(/[?&]page=(\d+)/);
  const currentPage = match ? parseInt(match[1]) : 1;

  if (prevOrNext === "next") pageToRender = oldData.info.next;
  let fetching;
  if (!data && pageToRender) fetching = await fetchData(pageToRender);

  // fallback if the new page does not exist: create page one
  // if (!data && typeof fetching !== "object") fetching = await fetchData();
  // if (!data && typeof fetching !== "object") return main.innerHTML;
  if (data) fetching = data;

  if (typeof fetching === "object") {
    main.innerHTML = "";
    main.append(createCards(fetching.results));

    // Disable Buttons
    fetching.info.prev
      ? (prevButton.disabled = false)
      : (prevButton.disabled = true);
    fetching.info.next
      ? (nextButton.disabled = false)
      : (nextButton.disabled = true);

    // Page numbers
    pagination.textContent = `${currentPage}／${fetching.info.pages}`;
    // RETURN
    return fetching;
  }
  return oldData;
};
