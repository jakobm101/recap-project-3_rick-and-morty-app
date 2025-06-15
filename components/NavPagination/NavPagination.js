import { fetchData } from "../Fetch/fetch.js";
import createCards from "../CharacterCard/CharacterCard.js";

const pagination = document.querySelector('[data-js="pagination"]');
const main = document.querySelector("main");

export async function pageTurn(nextUrl, searchQuery, pageNumber) {
  let data;

  if (nextUrl) {
    data = await (await fetch(nextUrl)).json();
  } else {
    data = await fetchData(pageNumber, searchQuery);
  }

  main.innerHTML = "";
  main.append(createCards(data.results));

  const current = nextUrl
    ? new URL(nextUrl).searchParams.get("page")
    : pageNumber;

  pagination.textContent = `${current}/${data.info.pages}`;

  return data;
}
