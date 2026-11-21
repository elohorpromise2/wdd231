"use strict";

/* =========================================
   THANK YOU PAGE
   Display submitted membership information
========================================= */

const params = new URLSearchParams(window.location.search);

const applicationDetails = document.querySelector("#application-details");

const firstName = params.get("firstName");
const lastName = params.get("lastName");
const email = params.get("email");
const phone = params.get("phone");
const businessName = params.get("businessName");
const timestamp = params.get("timestamp");

if (applicationDetails && firstName && lastName && email && phone && businessName && timestamp) {

    const formattedDate = new Date(timestamp).toLocaleString();

    applicationDetails.innerHTML = `
        <p><strong>First Name:</strong> ${escapeHTML(firstName)}</p>
        <p><strong>Last Name:</strong> ${escapeHTML(lastName)}</p>
        <p><strong>Email Address:</strong> ${escapeHTML(email)}</p>
        <p><strong>Mobile Phone:</strong> ${escapeHTML(phone)}</p>
        <p><strong>Business Name:</strong> ${escapeHTML(businessName)}</p>
        <p><strong>Application Date:</strong> ${escapeHTML(formattedDate)}</p>
    `;

} else if (applicationDetails) {

    applicationDetails.textContent =
        "No complete application information was found. Please return to the Join page and submit the form.";

}


// Prevent submitted text from being interpreted as HTML
function escapeHTML(value) {

    return value.replace(/[&<>"']/g, (character) => {

        const characters = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return characters[character];

    });

}