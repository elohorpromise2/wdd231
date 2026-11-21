
"use strict";

/* =========================================
   BUSINESS DIRECTORY
========================================= */

const membersContainer = document.querySelector("#members-container");
const loadingMessage = document.querySelector("#loading-message");

const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");


/* =========================================
   LOAD BUSINESS DATA
========================================= */

async function getMembers() {

    try {

        const response = await fetch("./data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const members = await response.json();

        if (!Array.isArray(members) || members.length === 0) {
            throw new Error("No business records were found.");
        }

        displayMembers(members);

        loadingMessage.textContent = "";

    } catch (error) {

        console.error("Directory loading error:", error);

        loadingMessage.textContent =
            "Sorry, the business directory could not be loaded. Please try again.";

    }

}


/* =========================================
   DISPLAY BUSINESS CARDS
========================================= */

function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");
        card.classList.add("member-card");

        // Business image
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("member-image");

        const image = document.createElement("img");

        image.src = `./images/${member.image}`;
        image.alt = `${member.name} business image`;
        image.loading = "lazy";

        image.onerror = () => {

            console.error(
                `Image failed to load for ${member.name}:`,
                image.src
            );

            image.style.display = "none";

            const fallback = document.createElement("div");
            fallback.classList.add("image-fallback");
            fallback.textContent = "Business Image Unavailable";

            imageWrapper.appendChild(fallback);

        };

        imageWrapper.appendChild(image);

        // Business name
        const name = document.createElement("h2");
        name.textContent = member.name;

        // Business description
        const description = document.createElement("p");
        description.textContent =
            member.description || "Business in Abuja.";

        // Business address
        const address = document.createElement("p");
        address.innerHTML = "<strong>Address:</strong> ";
        address.append(document.createTextNode(member.address));

        // Business phone
        const phone = document.createElement("p");
        phone.innerHTML = "<strong>Phone:</strong> ";
        phone.append(document.createTextNode(member.phone));

        // Membership level
        const membership = document.createElement("p");
        const level = Number(member.membershipLevel);

        const membershipNames = {
            1: "Member",
            2: "Silver",
            3: "Gold"
        };

        membership.innerHTML = "<strong>Membership:</strong> ";
        membership.append(
            document.createTextNode(
                membershipNames[level] || "Member"
            )
        );

        // Business website
        const link = document.createElement("a");

        link.href = member.website;
        link.textContent = "Visit Website";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.classList.add("website-link");

        // Add all elements to the card
        card.append(
            imageWrapper,
            name,
            description,
            address,
            phone,
            membership,
            link
        );

        membersContainer.appendChild(card);

    });

    console.log(`${members.length} businesses loaded successfully.`);

}


/* =========================================
   GRID VIEW
========================================= */

gridButton.addEventListener("click", () => {

    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");

    gridButton.classList.add("active-view");
    listButton.classList.remove("active-view");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");

});


/* =========================================
   LIST VIEW
========================================= */

listButton.addEventListener("click", () => {

    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");

    listButton.classList.add("active-view");
    gridButton.classList.remove("active-view");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");

});


/* =========================================
   INITIALIZE DIRECTORY
========================================= */

getMembers();
