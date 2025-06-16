export const fakeData = {
  id: 2,
  name: "Morty Smith",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: {
    name: "Earth",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  location: {
    name: "Earth",
    url: "https://rickandmortyapi.com/api/location/20",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
    // ...
  ],
  url: "https://rickandmortyapi.com/api/character/2",
  created: "2017-11-04T18:50:21.651Z",
};

export function createCharacterCard({ image, name, status, type, episode }) {
  const Card = document.createElement("li");
  Card.classList.add("card");
  Card.innerHTML = `
          <div class="card__image-container">
            <img
              class="card__image"
              src=${image}
              alt=${name}
            />
            <div class="card__image-gradient"></div>
          </div>
          <div class="card__content">
            <h2 class="card__title">${name}</h2>
            <dl class="card__info">
              <dt class="card__info-title">Status</dt>
              <dd class="card__info-description">${status}</dd>
              <dt class="card__info-title">Type</dt>
              <dd class="card__info-description">${type}</dd>
              <dt class="card__info-title">Occurrences</dt>
              <dd class="card__info-description">${episode.length}</dd>
            </dl>
          </div>

    `;
  return Card;
}

export default function createCards(fetchedData) {
  let cards = document.createElement("ul");
  cards.classList = "card-container";
  cards.setAttribute("data-js", "card-container");
  //<ul class="card-container" data-js="card-container"></ul>
  for (const person of fetchedData) cards.append(createCharacterCard(person));
  return cards;
}
