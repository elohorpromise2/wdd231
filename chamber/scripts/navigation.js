"use strict";

/* =========================================
   SHARED CHAMBER MOBILE NAVIGATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector("#menu-button");
    const navigation = document.querySelector("#navigation");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {

        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuButton.textContent = isOpen ? "✕" : "☰";

    });

});