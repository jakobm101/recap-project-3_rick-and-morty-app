export const fetchData = async (newURL = URL) => {
  const URL = `https://rickandmortyapi.com/api/character`;
  try {
    const response = await fetch(newURL);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error.message);
  }
};
