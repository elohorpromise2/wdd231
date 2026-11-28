
import { placesOfInterest } from "../data/discover.mjs";

// DISPLAY THE EIGHT PLACES
const discoverGrid = document.querySelector("#discover-grid");

function displayPlaces(places) {
    discoverGrid.innerHTML = "";

    places.forEach((place) => {
        const card = document.createElement("article");
        card.classList.add("discover-card");

        const heading = document.createElement("h2");
        heading.textContent = place.name;

        const figure = document.createElement("figure");
        const image = document.createElement("img");

        image.src = place.image;
        image.alt = place.name;
        image.loading = "lazy";
        image.width = 300;
        image.height = 200;

        figure.appendChild(image);

        const address = document.createElement("address");
        address.textContent = place.address;

        const description = document.createElement("p");
        description.textContent = place.description;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Learn More";

        button.addEventListener("click", () => {
            const location = encodeURIComponent(
                `${place.name}, ${place.address}`
            );

            window.open(
                `https://www.google.com/maps/search/?api=1&query=${location}`,
                "_blank",
                "noopener,noreferrer"
            );
        });

        card.appendChild(heading);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        discoverGrid.appendChild(card);
    });
}

displayPlaces(placesOfInterest);


// VISITOR MESSAGE USING LOCAL STORAGE
const visitMessage = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("discoverLastVisit");
const currentVisit = Date.now();

if (!lastVisit) {
    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";

} else {
    const timeDifference = currentVisit - Number(lastVisit);
    const oneDay = 24 * 60 * 60 * 1000;

    if (timeDifference < oneDay) {
        visitMessage.textContent =
            "Back so soon! Awesome!";

    } else {
        const daysBetween = Math.floor(timeDifference / oneDay);

        const dayWord = daysBetween === 1 ? "day" : "days";

        visitMessage.textContent =
            `You last visited ${daysBetween} ${dayWord} ago.`;
    }
}

// Save the current visit date
localStorage.setItem("discoverLastVisit", currentVisit);
