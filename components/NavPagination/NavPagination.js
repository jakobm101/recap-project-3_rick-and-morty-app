import { fetchData } from "../Fetch/fetch.js";
import createCards from "../CharacterCard/CharacterCard.js";
const pagination = document.querySelector('[data-js="pagination"]');
const main = document.querySelector("main");

export const pageTurn = async (next) => {
  if (next === null) {
    console.log("next ist null");
  }
  let fetching;

  try {
    fetching = await fetchData(next);
  } catch (error) {
    log.error(error);
  }
  // fallback if the new page does not exist
  if (typeof fetching.results !== "object") {
    fetching = await fetchData();
  } else {
    main.innerHTML = "";
    main.append(createCards(fetching.results));
    pagination.textContent = `${fetching.info.pages}`;
    return fetching;
  }
};
