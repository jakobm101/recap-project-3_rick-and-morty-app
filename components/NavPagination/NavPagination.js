import { fetchData } from "../Fetch/fetch.js";
import createCards from "../CharacterCard/CharacterCard.js";

export const pageTurn = async (next) => {
  const main = document.querySelector("main");
  let fetching;
    fetching = await fetchData(next);
  if (typeof fetching === "object") {
    main.innerHTML = "";
    main.append(createCards(fetching.results));
  } else {
    alert("no more pages");
  }
  return fetching
};

