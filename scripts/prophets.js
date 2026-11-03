const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        displayProphets(data.prophets);

    } catch (error) {
        console.error(error);
    }
}

getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {

        // Create HTML elements
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');

        // Add prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Add prophet's portrait
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Add birth information
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Add elements to the card
        card.appendChild(fullName);
        card.appendChild(portrait);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);

        // Add card to the webpage
        cards.appendChild(card);

    });
};