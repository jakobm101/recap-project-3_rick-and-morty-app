import { fetchData } from "../Fetch/fetch.js";
import createCards from "../CharacterCard/CharacterCard.js";

export const pageTurn = async (next) => {
  const main = document.querySelector("main");
  let fetching;
  try {
    fetching = await fetchData(next);
  } catch (error) {
    log.error(error);
  }
  // fallback if the new page does not exist
  if (typeof fetching.results !== "object") {
    fetching = await fetchData();
    console.log('yo');
    
  } else {
    main.innerHTML = "";
    main.append(createCards(fetching.results));
    return fetching;
  }
};
