const URL = `https://rickandmortyapi.com/api/character`;

export const fetchData = async (newURL = URL) => {
  try {
    const response = await fetch(newURL);
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
