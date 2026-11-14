// ======================================
// MOBILE NAVIGATION
// ======================================

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuButton.textContent = isOpen ? "✕" : "☰";
    });
}


// ======================================
// BUSINESS SPOTLIGHTS
// ======================================

const spotlightContainer = document.querySelector("#spotlight-container");


// Shuffle businesses randomly
function shuffleBusinesses(businesses) {
    const shuffled = [...businesses];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[randomIndex]] =
            [shuffled[randomIndex], shuffled[i]];
    }

    return shuffled;
}


// Create business spotlight cards
function createSpotlightCard(business) {

    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    const image = document.createElement("img");
    image.src = `images/${business.image}`;
    image.alt = `${business.name} logo`;
    image.loading = "lazy";

    image.addEventListener("error", () => {
        image.remove();
    });

    const name = document.createElement("h3");
    name.textContent = business.name;

    const address = document.createElement("p");
    address.textContent = `Address: ${business.address}`;

    const phone = document.createElement("p");
    phone.textContent = `Phone: ${business.phone}`;

    const membership = document.createElement("p");

    const membershipName =
        Number(business.membershipLevel) === 3 ? "Gold" : "Silver";

    membership.textContent = `Membership: ${membershipName}`;

    const website = document.createElement("a");
    website.href = business.website;
    website.textContent = "Visit Website";
    website.target = "_blank";
    website.rel = "noopener noreferrer";

    card.append(
        image,
        name,
        address,
        phone,
        membership,
        website
    );

    return card;
}


// Load businesses from JSON
async function loadSpotlights() {

    try {

        const response = await fetch("./data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load business information.");
        }

        const businesses = await response.json();

        // Select only Silver and Gold members
        const qualifiedBusinesses = businesses.filter(business =>
            Number(business.membershipLevel) === 2 ||
            Number(business.membershipLevel) === 3
        );

        // Randomly select three businesses
        const selectedBusinesses =
            shuffleBusinesses(qualifiedBusinesses).slice(0, 3);

        spotlightContainer.innerHTML = "";

        selectedBusinesses.forEach(business => {
            const card = createSpotlightCard(business);
            spotlightContainer.appendChild(card);
        });

        if (selectedBusinesses.length === 0) {
            spotlightContainer.textContent =
                "No Silver or Gold businesses are available.";
        }

    } catch (error) {

        console.error("Spotlight error:", error);

        spotlightContainer.textContent =
            "Business spotlights are currently unavailable.";

    }

}


// Run the function
if (spotlightContainer) {
    loadSpotlights();
}