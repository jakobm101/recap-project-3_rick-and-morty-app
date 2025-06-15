// export const URL = `https://rickandmortyapi.com/api/character`;

// export const fetchData = async (newURL = URL) => {
//   try {
//     const response = await fetch(newURL);

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error.message);
//   }
// };
export const URL = "https://rickandmortyapi.com/api/character";

export async function fetchData(page, searchQuery) {
  let url = `${URL}?page=${page}`;
  if (searchQuery) {
    url += `&name=${encodeURIComponent(searchQuery)}`;
  }
  const response = await fetch(url);
  return response.json(); // pass back API result
}
